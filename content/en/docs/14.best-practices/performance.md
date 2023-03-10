Чаще всего при работе с клиентскими приложениями вы можете столкнуться с двуми проблемами - ресурсоемкие операции и низкий ФПС. В первом случае причина в том, что синхронные операции такие как исполнение ресурсоемного JS кода или некоторые АПИ браузера блокируют основной поток. Во втором случае это чаще всего связано с непосредственным отображением элементов самим браузером - чем их более и они сложнее, тем больше времени ему требуется на формирование лейаута и их отрисовку.

Конкретно по отношению к данному фреймворку вы можете придерживаться следующих подходов, которые позволят минимизировать влияние вышеупомянутых подходов:

1. Подключать плагины только при необходимости

  Например, если вы занимаетесь преобразованием графа и на этом этапе не выполняется визуализация промежуточных результатов преобразования, то вы можете вовсе не подключать другие плагины, а результат преобразования просто скопировать в новых редактор, который уже имеет все необходимые подключенные плагины.

2. Подменять узлы более простыми элементами при некотором уровне зум

  Данный подход более полезен в случае, когда вы визуализируете большое количество узлов (несколько сотен или даже тысячу). В этом случае узким местом является непосредственно сам рендеринг елементов браузером, когда все узлы находятся во вьопорте. Как правило, если во вьюпорте отображается много узлов, значит уровень зума совсем небольшой и каждый из узлов занимает небольшую площадь пикселей. В свою очередь это значит, что такие узлы можно заменить, к примеру, на прямоугольники такого же размера, но без содержимого. Это значительно снизит затраты на отображение узлов без особого вреда для UX.

  Такой подход применяется в визуализации 3D и называется LOD (Level of details). Вот пример реализации такого подхода: /ссылка на про пример/



