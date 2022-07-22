# 2-MBC-SCS-Frontend
TS, React (Router), Redux (RTK), WebSocket, Tailwind  

# Что?
Фронт на Реакте для демонстрации Библии и песен в ОБС через web-документ.
Бэк лежит в [соседнем репо](https://github.com/skavem/2-MBC-SCS-Backend)

# Зачем?
Приложение на React красивое и удобное, позволяет легко расширять и создавать собственную логику.
Создавать расширение для OBS было бы долго и дорого, а WEB-технологии "из коробки" предоставляют и возможности передачи, и обработки, и приятной глазу демонстрации данных.

# Как?
## Загрузка
```
git init
git remote add origin https://github.com/skavem/2-MBC-SCS-Frontend
git pull origin main
```

## Сборка
```
npm install
npm run build
```

## Деплой
Заставить свой движок правильно выполнять роутинг.
[Для apache](https://medium.com/@nutanbhogendrasharma/create-simple-reactjs-application-and-host-in-xampp-4dae8e466c50)
