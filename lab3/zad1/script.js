document.getElementById("set_style").addEventListener("click", () => {

    for (el of document.getElementsByTagName("h1")) {
        el.classList.add("h1_id");
    }
    for (el of document.getElementsByTagName("aside")) {
        el.classList.add("aside_id");
        el.classList.add("azure");
    }
    for (el of document.getElementsByTagName("footer")) {
        el.classList.add("footer_id");
        el.classList.add("azure");
    }
    for (el of document.getElementsByTagName("header")) {
        el.classList.add("header_id");
        el.classList.add("azure");
    }
    for (el of document.getElementsByTagName("main")) {
        el.classList.add("main_id");
        el.classList.add("azure");
    }
    for (el of document.getElementsByTagName("nav")) {
        el.classList.add("nav_id");
        el.classList.add("azure")
    }
    for (el of document.getElementsByTagName("div")) {
        el.classList.add("wrapper");
    }
    for (el of document.getElementsByTagName("li")) {
        el.classList.add("li_class");
    }
    document.getElementById("animation_id").classList.add("animation_id");

})

document.getElementById("del_style").addEventListener("click", () => {
    for (el of document.getElementsByTagName("h1")) {
        el.classList.remove("h1_id");
    }
    for (el of document.getElementsByTagName("aside")) {
        el.classList.remove("aside_id");
        el.classList.remove("azure");
    }
    for (el of document.getElementsByTagName("footer")) {
        el.classList.remove("footer_id");
        el.classList.remove("azure");
    }
    for (el of document.getElementsByTagName("header")) {
        el.classList.remove("header_id");
        el.classList.remove("azure");
    }
    for (el of document.getElementsByTagName("main")) {
        el.classList.remove("main_id");
        el.classList.remove("azure");
    }
    for (el of document.getElementsByTagName("nav")) {
        el.classList.remove("nav_id");
        el.classList.remove("azure")
    }
    for (el of document.getElementsByTagName("div")) {
        el.classList.remove("wrapper");
    }
    for (el of document.getElementsByTagName("li")) {
        el.classList.remove("li_class");
    }
    document.getElementById("animation_id").classList.remove("animation_id");

})