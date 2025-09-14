import { disableBodyScroll, clearAllBodyScrollLocks } from "body-scroll-lock";
import { debounce } from "../utils/helpers";

class Modal {
	constructor() {
		this._init();
		this.currentModal = null;
		this.$modal = document.querySelector(".js-modal");
		this.$modalParent = this.$modal.parentElement;
		this.bodyElement = document.querySelector("body");
		this.classModalOpen = "modal-open";
		this.modalModifiedClass = null;
		this.setPosition = null;
		this.onPopupEscPress = null;
		this.leftScroll = false;

		this._observer();
	}

	_init() {
		const BODY = document.querySelector("body");
		const createModal = `
    <div class="modal-overlay">
      <div class="js-modal modal">
        <span class="js-modal__close modal__close">&#x2716;</span>
        <div class="modal__content" data-setcontent></div>
      </div>
    </div>`;
		BODY.insertAdjacentHTML("beforeend", createModal);
	}

	_observer() {
		//============ Open and Close on click
		this.bodyElement.addEventListener("click", (evt) => {
			let target = evt.target;

			if (target.dataset.modal) {
				this.open(target.dataset.modal);
			}

			if (
				target.classList.contains("modal-overlay") ||
				target.classList.contains("js-modal__close")
			) {
				this.close();
			}
		});

		this.setPosition = debounce(this._setPosition, 250).bind(this);
		this.onPopupEscPress = this._onPopupEscPress.bind(this);
	}

	open(id) {
		//============ OPEN
		const temp = document.querySelector(id);
		const prevModal = document.querySelector(this.currentModal);

		this.modalModifiedClass = temp.classList.value;
		this._modalAddClass();

		if (this.currentModal && this.currentModal !== id) {
			this.$modal.classList.remove(prevModal.classList.value);
			this.leftScroll = true;
			this.close();

			if (temp) {
				this.bodyElement.classList.add(this.classModalOpen);
				let newContent = temp.content.cloneNode(true);

				this._modalAddClass();

				this.setContent(newContent);

				setTimeout(() => {
					this._showModal(this.$modalParent, this.$modal);
				}, 0);
			} else {
				// eslint-disable-next-line no-console
				console.log(`Your need add template with new content!`);
			}
		} else {
			this.bodyElement.classList.add(this.classModalOpen);
			const newContent = temp.content.cloneNode(true);

			this.setContent(newContent);

			setTimeout(() => {
				this._showModal(this.$modalParent, this.$modal);
			}, 0);
		}

		if (!this.leftScroll) {
			disableBodyScroll(temp.parentElement);
		}
		this.leftScroll = false;
		this.currentModal = id;
		window.addEventListener("resize", this.setPosition);
		document.addEventListener("keydown", this.onPopupEscPress);
	}

	setContent(html) {
		const content = this.$modal.querySelector("[data-setcontent]");
		content.innerHTML = "";
		content.appendChild(html);
	}

	close() {
		//============ CLOSE
		if (!this.leftScroll) {
			clearAllBodyScrollLocks();
		}

		if (this.$modal.classList.contains(this.modalModifiedClass)) {
			this.$modal.classList.remove(this.modalModifiedClass);
		}

		this.bodyElement.classList.remove(this.classModalOpen);
		this.$modalParent.classList.remove("fadeOut");
		this.$modal.classList.remove("fadeOut");
		this.$modal.removeAttribute("style");
		this.currentModal = null;

		this.$modal.querySelector("[data-setcontent]").innerHTML = "";

		window.removeEventListener("resize", this.setPosition);
		document.removeEventListener("keydown", this.onPopupEscPress);
	}

	_modalAddClass() {
		if (
			this.modalModifiedClass &&
			!this.$modal.classList.contains(this.modalModifiedClass)
		) {
			this.$modal.classList.add(this.modalModifiedClass);
		}
	}

	_showModal(modalOverlay = this.$modalParent, modal = this.$modal) {
		modalOverlay.classList.add("fadeOut");
		modal.classList.add("fadeOut");
		this._setPosition();
	}

	_setPosition() {
		//========= Position
		const position = {
			top: "20px",
			marginTop: 0
		};

		if (window.innerHeight > this.$modal.clientHeight) {
			position["top"] = `${window.innerHeight / 2}px`;
			position["marginTop"] = `-${this.$modal.clientHeight / 2}px`;
		}

		this.$modal.style.top = position.top;
		this.$modal.style.marginTop = position.marginTop;
	}

	_onPopupEscPress(evt) {
		if (this.bodyElement.classList.contains(this.classModalOpen)) {
			if (evt.keyCode === 27) this.close();
		}
	}
}

export default Modal;
