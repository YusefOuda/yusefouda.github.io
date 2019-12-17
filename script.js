window.onload = () => {
    const P = "~";
    let text = `${P}Hi there, ${P}my name is Yusef Ouda.${P}\n\nI am a software developer.${P}\n\nFind more info about me on `;
    let i = 0;
    printText(text, i);

    function printText(text,  i) {
        let delay = 90;
        const char = text[i];
        if (char === P)
            delay = 750;
        let ele = document.createElement("span");
        ele.innerText = char;
        setTimeout(() => {
            if (char !== P)
                document.getElementById("container").insertBefore(ele, document.getElementById("cursor"));
            if (++i < text.length)
                printText(text, i);
            else
                insertLink();
        }, delay);
    }

    function insertLink() {
        let ele = document.createElement("a");
        ele.href = "https://stackoverflow.com/cv/yusefouda";
        ele.innerText = "Stack Overflow";
        document.getElementById("container").insertBefore(ele, document.getElementById("cursor"));
    }
}