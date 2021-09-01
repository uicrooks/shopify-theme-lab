export default {
  addQueryParam(newParamObj, queryStr) {
    let queryObj = this.convertQueryStringToObject(queryStr);
    queryObj = { ...queryObj, ...newParamObj };
    let queryArr = [];
    Object.keys(queryObj).forEach(key => {
      queryArr.push(`${key}=${queryObj[key]}`);
    });
    return `?${queryArr.join("&")}`;
  },
  convertQueryStringToObject(str) {
    if (!str) return {};
    let obj = {};
    const keyValueStrArr = str.slice(1).split("&");
    keyValueStrArr.forEach(keyValueStr => {
      const keyValueArr = keyValueStr.split("=");
      obj[keyValueArr[0]] = keyValueArr[1];
    });
    return obj;
  },
  validateEmailAddress(emailString) {
    const filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(emailString)) { return true; } else { return false; }
  },
  setScrollListener(_remove) {
    const body = document.body;
    const scrollUp = "scroll-up";
    const scrollDown = "scroll-down";
    let lastScroll = 0;
    if (window.pageYOffset < 75) {
      body.classList.add("scrolled-top");
    } else { body.classList.remove("scrolled-top"); }
    function handleScroll() {
      const currentScroll = window.pageYOffset;
      if (currentScroll <= 0) {
        body.classList.remove(scrollUp);
        return;
      }
    
      if (currentScroll > lastScroll && !body.classList.contains(scrollDown)) {
        // down
        body.classList.remove(scrollUp);
        body.classList.add(scrollDown);
      } else if (
        currentScroll < lastScroll &&
        body.classList.contains(scrollDown)
      ) {
        // up
        body.classList.remove(scrollDown);
        body.classList.add(scrollUp);
      }
      lastScroll = currentScroll;
      if (currentScroll < 75) {
        body.classList.add("scrolled-top");
      } else { body.classList.remove("scrolled-top"); }
    }
    if (_remove) {
      window.removeEventListener("scroll", handleScroll);
    } else {
      window.addEventListener("scroll", handleScroll);
    }
  },
  vaultDiscountCode() {
    const params = this.convertQueryStringToObject(window.location.search);
    if (params.discount_code) {
      window.sessionStorage.setItem("discount_code", params.discount_code);
    }
  },
  scrollToLink() {
    const params = this.convertQueryStringToObject(window.location.search);
    if (params.scrolllink) {
      const elem = document.querySelector("[scrolllink='"+params.scrolllink+"']");
      if (elem) {
        const y = elem.getBoundingClientRect().top + window.scrollY;
        window.scroll({
          top: y,
          behavior: "smooth"
        });
      }
    }
  },
  addElementToBody(node, content) {
    var s = document.createElement(node);
    switch(node) {
      case "script-url":
        s.src=content;
        break;
      case "script":
        s.innerHTML = content;
        break;
      case "img":
        s.src=content;
        break;
    }
    document.body.appendChild(s);
  },
  convertPriceToWholeNumber(price) {
    return price.toString().slice(-2) === "00" ? price / 100 : price;
  }
};


