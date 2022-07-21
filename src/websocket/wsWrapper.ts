import { IBook, IChapter, ICouplet, ISearchVerse, ISong, IVerse } from "../models"
import { IShownCouplet, IShownVerse } from '../models/recv'
import { store } from "../store"
import { setBooks } from "../store/actions/BiblePage/booksActions"
import { setChapters } from "../store/actions/BiblePage/chaptersActions"
import { setShownCouplet, setShownVerse } from "../store/actions/recvActions"
import { setVerses } from "../store/actions/BiblePage/versesActions"
import { setSHVerses } from "../store/actions/BiblePage/versesSHActions"
import { changeWebsocketState } from "../store/actions/webSocketActions"
import { setSearchedSong, setSongs } from "../store/actions/SongsPage/songsActions"
import { setCouplets } from "../store/actions/SongsPage/coupletsActions"

export enum pTypeEnum {
  get = 'get',
  send = 'send',
  search = 'search',
  create = 'create',
  insert = 'insert',
  edit = 'edit',
  delete = 'delete',
  show_verse = 'show_verse',
  hide_verse = 'hide_verse',
  show_couplet = 'show_couplet',
  hide_couplet = 'hide_couplet',
  transmitter = 'transmitter',
  answer = 'answer',
  hide = 'hide',
  show = 'show',
}

export enum pObjEnum {
  book = 'book',
  chapter = 'chapter',
  verse = 'verse',
  song = 'song',
  couplet = 'couplet',
  auth = 'auth',
  reciever = 'reciever',
  error = 'error'
}

export enum WebSocketReadyState {
  CONNECTING,
  OPEN,
  CLOSING,
  CLOSED
}

interface IParcel {
  type: pTypeEnum,
  object: pObjEnum,
  data: any
}

interface IAuthParcel {
  couplet?: { couplet: IShownCouplet },
  verse?: IShownVerse
}

interface IWSWrapper {
  sendParcel: (parcel: IParcel) => void

  getBooks: () => void
  getChapters: (bookId: string) => void
  getVerses: (chapterId: number) => void
  showVerse: (verse: IVerse) => void
  hideVerse: () => void
  searchVerse: (str: string) => void

  getSongs: () => void
  searchSong: (str: string) => void
  createSong: (song: ISong) => void
  getCouplets: (songId: number) => void
  showCouplet: (coupletId: number) => void
  hideCouplet: () => void
  editCouplet: (couplet: ICouplet) => void
  insertCouplet: (couplet: ICouplet) => void
  deleteCouplet: (couplet_id: number, song_id: number) => void
}

interface IAllAnswer<T> {
  all: T[]
}

enum AnsHandlersEnum {
  auth = 'auth',
  book = 'book',
  chapter = 'chapter',
  verse = 'verse',
  song = 'song',
  couplet = 'couplet',
}

interface IAnsHandlers {
  [AnsHandlersEnum.auth]: (data: IAuthParcel) => void
  [AnsHandlersEnum.book]: (data: IAllAnswer<IBook>) => void
  [AnsHandlersEnum.chapter]: (data: IAllAnswer<IChapter>) => void
  [AnsHandlersEnum.verse]: (data: IAllAnswer<IVerse>) => void
  [AnsHandlersEnum.song]: (data: IAllAnswer<ISong>) => void
  [AnsHandlersEnum.couplet]: (data: IAllAnswer<ICouplet>) => void
}

enum SearchHandlersEnum {
  verse = 'verse',
  song = 'song',
}

interface ISearchHandlers {
  [SearchHandlersEnum.verse]: (data: IAllAnswer<ISearchVerse>) => void
  [SearchHandlersEnum.song]: (data: { found?: ISong }) => void
}

enum ShowHandlersEnum {
  verse = 'verse',
  couplet = 'couplet',
}

interface IShowHandlers {
  [ShowHandlersEnum.verse]: (data: IShownVerse) => void
  [ShowHandlersEnum.couplet]: (data: { couplet: IShownCouplet }) => void
}

enum HideHandlersEnum {
  verse = 'verse',
  couplet = 'couplet',
}

interface IHideHandlers {
  [HideHandlersEnum.verse]: (data: {}) => void
  [HideHandlersEnum.couplet]: (data: {}) => void
}

export class WSWrapper implements IWSWrapper {
  private _ip: string
  private _port: string
  private _socket: WebSocket
  private answerHandlers: IAnsHandlers
  private searchHandlers: ISearchHandlers
  private showHandlers: IShowHandlers
  private hideHandlers: IHideHandlers

  constructor(ip: string, port: string) {
    this._ip = ip
    this._port = port

    this._socket = new WebSocket(`ws://${this._ip}:${this._port}`)
    console.log('establishing connection')
    this._socket.onclose = this.onclose
    this._socket.onopen = this.onopen
    this._socket.onmessage = this.onmessage

    this.answerHandlers = {
      auth: (data) => {
        if (data.couplet !== undefined) {
          store.dispatch(setShownCouplet(data.couplet.couplet))
        }
        if (data.verse !== undefined) {
          store.dispatch(setShownVerse(data.verse))
        }
      },

      book: data => store.dispatch(setBooks(data.all)),
      chapter: data => store.dispatch(setChapters(data.all)),
      verse: data => store.dispatch(setVerses(data.all)),

      song: data => store.dispatch(setSongs(data.all)),
      couplet: data => store.dispatch(setCouplets(data.all))
    }

    this.searchHandlers = {
      verse: data => {
        store.dispatch(setSHVerses(data.all))
      },
      song: data => {
        if (data.found) {
          store.dispatch(setSearchedSong(data.found))
        }
      }
    }

    this.showHandlers = {
      verse: data => {
        store.dispatch(setShownVerse(data))
      },
      couplet: data => {
        store.dispatch(setShownCouplet(data.couplet))
      }
    }

    this.hideHandlers = {
      verse: data => {
        store.dispatch(setShownVerse(null))
      },
      couplet: data => {
        store.dispatch(setShownCouplet(null))
      }
    }
  }

  onmessage = (message: MessageEvent) => {
    let parcel: IParcel = JSON.parse(message.data)

    console.info(parcel)

    if (parcel.object === pObjEnum.error) {
      return
    }

    if (parcel.type === pTypeEnum.show) {
      this.showHandlers[parcel.object as string as ShowHandlersEnum](parcel.data)
    }

    if (parcel.type === pTypeEnum.hide) {
      this.hideHandlers[parcel.object as string as HideHandlersEnum](parcel.data)
    }

    if (parcel.type === pTypeEnum.search) {
      this.searchHandlers[parcel.object as string as SearchHandlersEnum](parcel.data)
    }

    if (parcel.type === pTypeEnum.answer) {
      this.answerHandlers[parcel.object as string as AnsHandlersEnum](parcel.data)
    }
  }

  sendParcel = (parcel: IParcel) => {
    if (this._socket.readyState !== this._socket.OPEN) return
    this._socket.send(JSON.stringify(parcel))
  }

  getBooks = () => {
    this.sendParcel({
      type: pTypeEnum.get,
      object: pObjEnum.book,
      data: {}
    })
  }

  getChapters = (bookId: string) => {
    this.sendParcel({
      type: pTypeEnum.get,
      object: pObjEnum.chapter,
      data: { book_id: bookId }
    })
  }

  getVerses = (chapterId: number) => {
    this.sendParcel({
      type: pTypeEnum.get,
      object: pObjEnum.verse,
      data: {
        ch_id: chapterId
      }
    })
  }

  showVerse = (verse: IVerse) => {
    this.sendParcel({
      type: pTypeEnum.show_verse,
      object: pObjEnum.reciever,
      data: {
        verse_id: verse.id
      }
    })
  }

  hideVerse = () => {
    this.sendParcel({
      type: pTypeEnum.hide_verse,
      object: pObjEnum.reciever,
      data: {}
    })
  }

  searchVerse = (str: string) => {
    this.sendParcel({
      type: pTypeEnum.search,
      object: pObjEnum.verse,
      data: {
        search_str: str
      }
    })
  }

  getSongs = () => {
    this.sendParcel({
      type: pTypeEnum.get,
      object: pObjEnum.song,
      data: {}
    })
  }

  searchSong = (str: string) => {
    this.sendParcel({
      type: pTypeEnum.search,
      object: pObjEnum.song,
      data: {
        search_str: str
      }
    })
  }

  createSong = (song: ISong) => {
    this.sendParcel({
      type: pTypeEnum.create,
      object: pObjEnum.song,
      data: { song }
    })
  }

  getCouplets = (songId: number) => {
    this.sendParcel({
      type: pTypeEnum.get,
      object: pObjEnum.couplet,
      data: { song_id: songId }
    })
  }

  showCouplet = (coupletId: number) => {
    this.sendParcel({
      type: pTypeEnum.show_couplet,
      object: pObjEnum.reciever,
      data: {
        couplet_id: coupletId
      }
    })
  }

  hideCouplet = () => {
    this.sendParcel({
      type: pTypeEnum.hide_couplet,
      object: pObjEnum.reciever,
      data: {}
    })
  }

  editCouplet = (couplet: ICouplet) => {
    this.sendParcel({
      type: pTypeEnum.edit,
      object: pObjEnum.couplet,
      data: {
        couplet: couplet
      }
    })
  }

  insertCouplet = (couplet: ICouplet) => {
    this.sendParcel({
      type: pTypeEnum.insert,
      object: pObjEnum.couplet,
      data: {
        couplet: couplet
      }
    })
  }

  deleteCouplet = (couplet_id: number, song_id: number) => {
    this.sendParcel({
      type: pTypeEnum.delete,
      object: pObjEnum.couplet,
      data: {
        couplet_id,
        song_id
      }
    })
  }


  onopen = () => {
    store.dispatch(changeWebsocketState(WebSocketReadyState.OPEN))
    console.log('[WS]: connection established')
    let authObject = { type: pTypeEnum.transmitter, object: pObjEnum.auth, data: '' }
    this.sendParcel(authObject)
    this.getBooks()
    this.getSongs()
  }

  onclose = () => {
    store.dispatch(changeWebsocketState(WebSocketReadyState.CLOSED))
    setTimeout(this.establishConnection, 2000)
  }

  establishConnection = (ip: string | null = null, port: string | null = null) => {
    this._ip = ip !== null ? ip : this._ip
    this._port = port !== null ? port : this._port
    store.dispatch(changeWebsocketState(WebSocketReadyState.CONNECTING))
    if (this._socket !== undefined) {
      this._socket.onclose = null
      this._socket.close()
    }
    this._socket = new WebSocket(`ws://${ip ? ip : this._ip}:${port ? port : this._port}`)
    console.log('establishing connection')
    this._socket.onclose = this.onclose
    this._socket.onopen = this.onopen
    this._socket.onmessage = this.onmessage
  }
}

export default WSWrapper