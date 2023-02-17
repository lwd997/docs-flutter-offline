var contentMap = {
    INSTALL: "install",
    CREATE: "create",
};

/**
 * ~br - новый параграф
 * #[name](link) - ссылка
 * {{text}} - консольная команда
 * [[text]] - спойлер
 */

var content = {
    [contentMap.INSTALL]: {
        title: "Установка",
        body: [
            {
                heading: "Flutter",
                content: `
                    Для начала нужно установить: ~br
                    #[Flutter]() ~br
                    #[Jre]() ~br
                    
                `,
            },
        ],
    },
};

window.addEventListener("hashchange", function (e) {});

function applyContentChanges(page) {}
