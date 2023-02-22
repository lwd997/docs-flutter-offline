document.addEventListener("DOMContentLoaded", function () {
    var contentMap = {
        INSTALL: "install",
        CREATE: "launch",
        EMULATOR: "emulator",
        NOT_FOUND: "not_found",
    };
    var contentContainer = document.getElementById("content");
    var links = document.querySelectorAll(".navigation a");
    var allowCopyInput = document.getElementById("copy");
    var hrefList = [];
    var copyingAnimation = false;
    for (var i = 0; i < links.length; i++) {
        hrefList.push(links[i].href.split("#")[1]);
    }

    /**
     * ~br - новый параграф
     * !link url link! - ссылка
     * !code text code! - консольная команда
     * !note text note! - примечание
     * !b text b! - жирный текст
     */

    if (localStorage.getItem("allowCopy")) {
        allowCopyInput.checked = JSON.parse(localStorage.getItem("allowCopy"));
    }

    allowCopyInput.addEventListener("input", function (e) {
        localStorage.setItem("allowCopy", e.target.checked);
    });

    var content = {
        [contentMap.INSTALL]: {
            title: "Установка",
            body: [
                {
                    heading: "Скачать",
                    content: `     
                        Flutter !link https://storage.googleapis.com/flutter_infra_release/releases/stable/linux/flutter_linux_3.3.10-stable.tar.xzlink! ~br
                        JDK !link https://download.java.net/java/GA/jdk11/9/GPL/openjdk-11.0.2_linux-x64_bin.tar.gzlink! ~br
                        Gradle !link https://downloads.gradle-dn.com/distributions/gradle-7.4-all.zip link! ~br
                        platform-tools !link https://dl.google.com/android/repository/platform-tools_r33.0.1-linux.zip link! ~br
                        build-tools !link https://dl.google.com/android/repository/build-tools_r33-linux.zip link! ~br
                        Platform !link https://dl.google.com/android/repository/platform-31_r01.ziplink! ~br
                        sdk-tools !link https://dl.google.com/android/repository/sdk-tools-linux-4333796.ziplink! ~br
                        cmdline-tools !link https://dl.google.com/android/repository/commandlinetools-linux-9123335_latest.zip link! ~br
                        patcher !link https://dl.google.com/android/repository/3534162-studio.sdk-patcher.zip link! ~br
                        Emulator !link https://r2---sn-gvnuxaxjvh-v8cs.gvt1.com/edgedl/android/repository/emulator-linux_x64-9189900.zip link! ~br
                        system-images (для запуска нужен только 1): ~br               
                        android-33 w/ playstore !link https://dl.google.com/android/repository/sys-img/google_apis_playstore/x86_64-33_r06.zip link! ~br
                        android-28 w/ playstore !link https://dl.google.com/android/repository/sys-img/google_apis_playstore/x86_64-28_r08.zip link! ~br
                        android-25 !link https://dl.google.com/android/repository/sys-img/android/x86_64-25_r01.zip link! ~br
                        Кэши для оффлайн сборки андроид !link https://github.com/lwd997/flutter_deps-from-source/releases/download/updated_caches/caches.zip link! ~br
                        <br/>
                        !b Может понадобиться для билдов приложений использующих  C,С++: b! ~br
                        Clang !link https://github.com/llvm/llvm-project/releases/download/llvmorg-15.0.6/clang+llvm-15.0.6-x86_64-linux-gnu-ubuntu-18.04.tar.xz link! ~br
                        ninja !link https://github.com/ninja-build/ninja/releases/download/v1.11.1/ninja-linux.zip link! ~br
                        CMake !link https://github.com/Kitware/CMake/releases/download/v3.25.1/cmake-3.25.1-linux-x86_64.tar.gz link! ~br
                        PKG-Config !link https://pkgconfig.freedesktop.org/releases/pkg-config-0.29.tar.gz link! 
                    `,
                },

                {
                    heading: "Установить",
                    content: `
                        Распаковать все скачанное, кроме gradle - его не распаковывать, в папку flutter-src (стандартное) ~br
                        !code node ./prebuild.js code! ~br
                        !code bash ./runall.sh code! ~br
                        В build-gtk.js отключена сборка самих библиотек gtk. Собираются только ninja, cmake, clang и pkg-config  ~br
                        Если их архивы не скачивались, то можно закомментировать !code node "$PWD/build-gtk.js" code! в runall.sh
                        
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
                        !code cd project && flutter run code!
                    `,
                },
            ],
        },
        [contentMap.EMULATOR]: {
            title: "Android emulator",
            body: [
                {
                    heading: "Создание",
                    content: `
                        Через flutter: ~br
                        !code flutter emulators --create --name emulator_name code! ~br
                        Через avdmanager: ~br
                        !code ./avdmanager create avd -n emulator_name -k system-images;android-33;google_apis_playstore;x86_64 -d pixel code! ~br
                        !note 
                            <var>-n</var> название эмулятора <br/>
                            <var>-k</var> локальный репозиторий (образ лежит в system-images > android-33 > google_apis_playstore > x86_64) <br/>
                            <var>-d</var> устройство <br/>
                            <var>--force</var> создать новый эмулятор с тем же названием (старый удалится)
                        note! ~br
                        Можно добавить до него пусть в .bashrc
                    `,
                },
                {
                    heading: "Запуск",
                    content: `
                        Можно запускать эмуляторы либо флаттером, либо самим эмулятором: ~br
                        !code flutter emulators --launch emulator_name code! ~br
                        !code ./emulator -avd emulator_name  code!
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
                .replaceAll("!code", "<code onclick='copyText(this)'>")
                .replaceAll("code!", "</code>")
                .replaceAll("!note", "<blockquote>")
                .replaceAll("note!", "</blockquote>")
                .replaceAll("!b", "<b>")
                .replaceAll("b!", "</b>")
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
        if (!allowCopyInput.checked || copyingAnimation) return;
        try {
            copyingAnimation = true;
            navigator.clipboard.writeText(node.innerText);
            node.style.background = "rgb(90, 72, 131)";

            node.style.color = "rgb(234, 248, 201)";
            var restore = node.innerHTML;

            node.innerHTML = `
                <div style="width:${node.offsetWidth - 10}px;height:
                ${node.offsetHeight - 10}px;">
                    <div style="width:100%;height:100%;display:flex;justify-content:center;align-items:center;">Скопировано</div>
                </div>
            `;

            setTimeout(() => {
                node.style.background = "rgb(31, 23, 49)";
                node.style.color = "rgb(238, 204, 165)";
                node.innerHTML = restore;
                copyingAnimation = false;
            }, 250);
        } catch (error) {
            alert(error);
        }
    };
});
