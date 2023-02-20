document.addEventListener("DOMContentLoaded", function () {
    var contentMap = {
        INSTALL: "install",
        CREATE: "launch",
        NOT_FOUND: "not_found",
    };
    var contentContainer = document.getElementById("content");
    var links = document.querySelectorAll(".navigation a");
    var hrefList = [];
    for (var i = 0; i < links.length; i++) {
        hrefList.push(links[i].href.split("#")[1]);
    }

    /**
     * ~br - новый параграф
     * !link url link! - ссылка
     * !code text code! - консольная команда
     * [[text]] - спойлер
     */

    var content = {
        [contentMap.INSTALL]: {
            title: "Установка",
            body: [
                {
                    heading: "Скачать",
                    content: `
                        Для начала нужно скачать: ~br
                        Flutter !link https://localhost link! ~br
                        JRE !link https://localhost link! ~br
                        
                    `,
                },
                {
                    heading: "Распаковать в папку",
                    content: `
                        111: ~br
                        Flutter !link https://localhost link! ~br
                        !code sdkmanager "system-images;android-25;default;arm64-v8a" code!
                        
                    `,
                },
            ],
        },
        [contentMap.CREATE]: {
            title: "Запуск",
            body: [
                {
                    heading: "Создать оффлайн проект",
                    content: `
                        !code flutter create project -a java --offline code! ~br
                        !code code project/android/gradlew code!  (открываем через vscode) ~br
                        Заменить  ~br
                        !code exec "$JAVACMD" "\${JVM_OPTS[@]}" -classpath "$CLASSPATH" org.gradle.wrapper.GradleWrapperMain "$@" code! (последняя строка)~br
                        на ~br
                        !code exec "$JAVACMD" "\${JVM_OPTS[@]}" -classpath "$CLASSPATH" org.gradle.wrapper.GradleWrapperMain "$@" --offline code! ~br
                        !code cd projecte && flutter run code!
                    `,
                },
            ],
        },
        [contentMap.NOT_FOUND]: {
            title: "Нет Такого раздела",
            body: [
                {
                    heading: "Не найдено",
                    content: ``,
                },
            ],
        },
    };

    applyContentChanges(window.location.href.split("#")[1]);

    window.addEventListener("hashchange", function (e) {
        applyContentChanges(e.newURL.split("#")[1]);
    });

    function applyContentChanges(page) {
        for (var i = 0; i < hrefList.length; i++) {
            if (hrefList[i] !== page) {
                links[i].classList.remove("current");
            } else {
                links[i].classList.add("current");
            }
        }

        contentContainer.innerHTML = "";

        if (content[page]) render(content[page]);
        else render(content[contentMap.NOT_FOUND]);
    }

    function render(page) {
        document.title = page.title;
        page.body.forEach(function (el) {
            var block = document.createElement("div");
            var blockTitle = document.createElement("h1");
            var paragraphs = el.content
                .replaceAll("!code", "<code onclick='window.copyText(this)'>")
                .replaceAll("code!", "</code>")
                .replace(/(?<=!link)(.*)(?=link!)/g, '<a href="$1">$1</a>')
                .replaceAll("!link", "")
                .replaceAll("link!", "")
                .split("~br");
            var pars = document.createElement("div");

            pars.classList.add("block-text-content");
            block.classList.add("block");

            blockTitle.innerText = el.heading;

            paragraphs.forEach(function (p) {
                var par = document.createElement("p");
                par.innerHTML = p;
                pars.appendChild(par);
            });

            block.appendChild(blockTitle);
            block.appendChild(pars);
            contentContainer.appendChild(block);
        });
    }

    window.copyText = function (node) {
        try {
            navigator.clipboard.writeText(node.innerText);
            alert("copied");
        } catch (error) {
            alert(error);
        }
    };
});
