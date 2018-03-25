# shri_hometask_5

# Node.js
  1. Реализован веб-интерфейс для локального git репозитория.
  2. Функционал разбит на отдельные модули.
  3. Для асинхронных операций используются промисы.
  4. Путь к папке с репозиторием храниться в конфигурационном файле: config/config.json
  5. Переход на раздел выше обозначается - "..", закрыть файл и вернуться назад к дереву файлов - "Back".
  6. Запуск приложения: node app.js или npm start.


# Инфраструктура
  1. Проверка кода
    - С помощью npm run lint - js-файлы проверяются с помощью инструмента ESLint с набором правил eslint-config-google. 
    - С помощью npm run module-test и npm run integration-test - выполняются тесты (в первом случае mocha & chai, во втором selenium + hermione).
    
  2. Сборка проекта
    - Сборка происходит с помощью webpack. 2 типа сборки - dev или prod. В случае prod-сборки - минифицируется код (в данной задаче только css код).
  
  3. Контейнеризация приложения
    - Dockerfile лежит в корне проекта.
    
  4. Continuous Integration
    - Произведены все необходимые настройки Github, Travis и Heroku, но не удалось сгенерировать api key из-за ошибки в моей ОС (Ubuntu 16.04). Ruby gem никак не мог скачаться (Unable to download data from rubygems.org...), из-за чего не смог установить Travis CLI. Воспользовался сервисом https://travis-encrypt.github.io/ - но это не решило проблему. Job log от Travis: "API request failed. Message: Invalid credentials provided. / invalid option '--api_key='".

# Тесты
  # ! 
  Для демонстрации работы тестов, необходимо сначала выполнить команду "npm run clone-test-repo", затем поменять repoPath в конфиге на "test-repo". Тесты написаны конкретно под этот тестовый репозиторий.

  1. Модульные тесты.
    - Запуск модульных тестов: "npm run module-test".
    - Данные тесты проверяют правильность исполнения git-команд, используемых в приложении.
    - Также настроено построение отчета о покрытии кода тестами. Команда для построения отчета: "npm run coverage-test".
    
  2. Интеграционные тесты.
    - Создано 3 плагина (для соблюдения DRY).
    - !Важно. Для корректной работы реализованных плагинов для hermione, необходимо скопировать папку hermione-custom-commands в папку node_modules.
    - Запуск интеграционных тестов: "selenium-standalone start", во 2-й вкладке терминала запускаем приложение "npm start", и в 3-й вкладке сами тесты: "npm start integration-test".
