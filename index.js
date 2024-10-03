(function (global) {
  function CookiesLib() {
    this.start = async function (elementId) {
      let usedInit = [];
      const menuUseList = [
        {
          title: "Strictly Necessary Cookies",
          desc: "These cookies are necessary for the website to function and cannot be switched off in our systems. They are usually only set in response to actions made by you which amount to a request for services, such as setting your privacy preferences, logging in or filling in forms. You can set your browser to block or alert you about these cookies, but some parts of the site will not then work. These cookies do not store any personally identifiable information.",
          always_active: true,
        },
        {
          title: "Performance Cookies",
          desc: "These cookies allow us to count visits and traffic sources so we can measure and improve the performance of our site. They help us to know which pages are the most and least popular and see how visitors move around the site. All information these cookies collect is aggregated and therefore anonymous. If you do not allow these cookies we will not know when you have visited our site, and will not be able to monitor its performance.",
          always_active: false,
        },
        {
          title: "Functional Cookies",
          desc: "These cookies enable the website to provide enhanced functionality and personalisation. They may be set by us or by third party providers whose services we have added to our pages. If you do not allow these cookies then some or all of these services may not function properly.",
          always_active: false,
        },
        {
          title: "Targeting Cookies",
          desc: "These cookies may be set through our site by our advertising partners. They may be used by those companies to build a profile of your interests and show you relevant adverts on other sites. They do not store directly personal information, but are based on uniquely identifying your browser and internet device. If you do not allow these cookies, you will experience less targeted advertising.",
          always_active: false,
        },
      ];

      const showModal = function (idModal) {
        const modalElement = document.getElementById(idModal);
        const backDrop = document.getElementsByClassName(
          "lib-cookies-modal__backdrop"
        );

        if (modalElement && backDrop.length) {
          modalElement.classList.add("show");
          backDrop[0].classList.add("show");
        }
      };

      const closeModal = function (idModal) {
        const modalElement = document.getElementById(idModal);
        const backDrop = document.getElementsByClassName(
          "lib-cookies-modal__backdrop"
        );

        if (modalElement && backDrop.length) {
          modalElement.classList.remove("show");
          backDrop[0].classList.remove("show");
        }
      };

      const generateButton = function (title, event = () => {}) {
        const button = document.createElement("button");
        button.textContent = title;
        button.addEventListener("click", () => {
          event();
        });
        return button;
      };

      const generateBackdrop = function (mainId, modalId) {
        const mainElement = document.getElementById(mainId);
        const backdrop = document.createElement("div");
        backdrop.classList.add("lib-cookies-modal__backdrop");
        const currentBackdrop = document.getElementsByClassName(
          "lib-cookies-modal__backdrop"
        );

        if (!currentBackdrop.length) {
          mainElement.insertAdjacentElement("afterend", backdrop);
          backdrop.addEventListener("click", () => {
            closeModal(modalId);
          });
        }
      };

      const generateAccordionItem = function (data, index) {
        const accItem = document.createElement("div");
        const headerItem = document.createElement("div");
        const contentItem = document.createElement("div");
        const isChecked = usedInit.includes(`switch-lib-cookies-${index}`);

        accItem.classList.add("lib-cookies-modal__acc-item");
        headerItem.classList.add("lib-cookies-modal__acc-item__header");

        headerItem.innerHTML = `<div class="d-flex gap-1">
                <div class="lib-cookies-modal__acc-item__header__indicator"></div>
                <div>${data.title}</div>
            </div>
            <div>
                ${
                  data.always_active
                    ? "Always Active"
                    : `<input type="checkbox" class="switch-toogle" name="switch-lib-cookies[]" value="switch-lib-cookies-${index}" id="switch-lib-cookies-${index}" ${
                        isChecked ? "checked" : ""
                      } /><label for="switch-lib-cookies-${index}">Toggle</label>`
                }
            </div>`;
        contentItem.innerHTML = `<div class="lib-cookies-modal__acc-item__body">${data.desc}</div>`;

        headerItem.addEventListener("click", () => {
          const isExpand = accItem.classList.contains("expanded");

          if (isExpand) {
            accItem.classList.remove("expanded");
          } else {
            accItem.classList.add("expanded");
          }
        });

        accItem.appendChild(headerItem);
        accItem.appendChild(contentItem);

        return accItem;
      };

      const generateMenu = function () {
        const accordionEl = document.createElement("div");
        accordionEl.classList.add("lib-cookies-modal__acc");

        menuUseList.forEach((el, index) => {
          const accordionItem = document.createElement("div");
          const accItem = generateAccordionItem(el, index);
          accordionItem.appendChild(accItem);
          accordionEl.appendChild(accordionItem);
        });

        return accordionEl;
      };

      const generateModal = function () {
        const specificDate = new Date();
        const timeAsInteger = specificDate.getTime();
        const idModal = `lib-cok-${timeAsInteger}`;
        const settingDesc =
          "When you visit our website, we store cookies on your browser to collect information. The information collected might relate to you, your preferences or your device, and is mostly used to make the site work as you expect it to and to provide a more personalized web experience. However, you can choose not to allow certain types of cookies, which may impact your experience of the site and the services we are able to offer. Click on the different category headings to find out more and change our default settings according to your preference. You cannot opt-out of our Strictly Necessary Cookies as they are deployed in order to ensure the proper functioning of our website (such as prompting the cookie banner and remembering your settings, to log into your account, to redirect you when you log out, etc.)";

        const modal = document.createElement("div");
        modal.classList.add("lib-cookies-modal");

        const closeButton = generateButton("Close", () => closeModal(idModal));

        const modalDialog = document.createElement("div");
        const modalHeader = document.createElement("div");
        const modalContent = document.createElement("div");

        modalDialog.classList.add("lib-cookies-modal__dialog");
        modalHeader.classList.add("lib-cookies-modal__header");

        modalHeader.innerHTML = `<div>Cookies</div>`;
        modalContent.innerHTML = `<div>
            <p>${settingDesc}</p>
            <a href="#!" target="_blank">More Information</a>
            <div>
                <button class="btnAllow">Allow All</button>
                <div>Manage Consent Preferences</div>
            </div>
            <div class="lib-cookies-modal__menu"></div>
            <div>
                <button class="btnConfirm">Confirm My Choices</button>
            </div>
        </div>`;

        const accEl = generateMenu();

        modalHeader.appendChild(closeButton);
        modalDialog.appendChild(modalHeader);
        modalDialog.append(modalContent);

        const elAcc = modalContent.getElementsByClassName(
          "lib-cookies-modal__menu"
        );
        const btnAllow = modalDialog.getElementsByClassName("btnAllow");
        const btnConfirm = modalDialog.getElementsByClassName("btnConfirm");

        if (btnAllow && btnAllow.length) {
          btnAllow[0].addEventListener("click", () => {
            onAcceptAll();
            closeModal(idModal);
          });
        }

        if (btnConfirm && btnConfirm.length) {
          btnConfirm[0].addEventListener("click", () => {
            onSubmit(idModal);
          });
        }

        if (elAcc && elAcc.length) {
          elAcc[0].appendChild(accEl);
        }

        modal.appendChild(modalDialog);
        modal.setAttribute("id", idModal);

        return {
          element: modal,
          id: idModal,
        };
      };

      const closeMainMenu = function () {
        const mainEl = document.getElementById(elementId);
        mainEl.classList.add("is-accept-all");
      };

      const onAcceptAll = function () {
        const payload = [];
        menuUseList.forEach((el, index) => {
          if (!el.always_active) {
            const elInput = document.getElementById(
              `switch-lib-cookies-${index}`
            );

            payload.push(elInput.value);
          }
        });
        closeMainMenu();
      };

      const onSubmit = function (idModal) {
        const payload = [];
        menuUseList.forEach((el, index) => {
          if (!el.always_active) {
            const elInput = document.getElementById(
              `switch-lib-cookies-${index}`
            );

            if (elInput.checked) {
              payload.push(elInput.value);
            }
          }
        });

        closeModal(idModal);
        closeMainMenu();
      };

      const generateMain = async function (elementIdEl) {
        const getInit = await getCurrentInit();
        const useElement = document.getElementById(elementIdEl);
        useElement.innerHTML = "";

        const bottomMenu = await document.createElement("div");
        bottomMenu.classList.add("lib-cookies-main-menu");
        bottomMenu.innerHTML = await `<div>
            <div>We value your Privacy</div>
            <div>This website stores cookies on your computer. These cookies are used to collect information about how you interact with our website and allow us to remember you. We use this information in order to improve and customize your browsing experience and for analytics and metrics about our visitors both on this website and other media. To find out more about the cookies we use, see our <a href="#!">Cookie Policy</a></div>
        </div>`;
        const bottomMenuActions = await document.createElement("div");

        bottomMenuActions.classList.add("lib-cookies-main-menu__actions");

        const modal = await generateModal();
        const buttonManage = await generateButton("Manage Cookies", () =>
          showModal(modal.id)
        );
        const buttonAcceptAll = await generateButton("Accept All Cookies", () =>
          onAcceptAll()
        );

        generateBackdrop(elementIdEl, modal.id);
        bottomMenuActions.appendChild(buttonManage);
        bottomMenuActions.appendChild(buttonAcceptAll);

        bottomMenu.appendChild(bottomMenuActions);
        useElement.appendChild(bottomMenu);
        useElement.appendChild(modal.element);

        if (getInit.initAble) {
            useElement.classList.add('d-none');
        }
      };

      const getCurrentInit = function () {
        usedInit = ["switch-lib-cookies-2"];

        return {
            initAble: false,
            data: usedInit
        }
      };

      // Mounted
      generateMain(elementId);
    };
  }

  global.CookiesLib = CookiesLib;
})(this);
