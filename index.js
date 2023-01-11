const chat = [
    "初めまして弊社に興味を持ってくれてありがとう！",
    "まずは名前を聞いてもいいかな",
    "次に年齢も聞いていいかな",
    "色々教えてくれてありがとう！！じゃあここから応募にから応募に進んでね！（URL）",
    "何かメッセージを送ってくれたら君の今日の運勢を占うよ！",
    "今日はいろいろ答えてくれてありがとう！！また会える日を楽しみにしてるよ",
    // 運勢配列は最後に記載
    ["大吉", "中吉", "吉", "末吉", "凶…じゃなくて大大大吉", ""]
];

let chatCount = 0;

const chatBtn = document.getElementById("chat-button");
const inputText = document.getElementById("chat-input");
const form = document.getElementById("form");

function output(val, person) {
    const field = document.getElementById("field");
    field.scroll(0, field.scrollHeight - field.clientHeight);

    const ul = document.getElementById("chat-ul");
    const li = document.createElement("li");
    // listタグ直下のテキストの箱
    const div = document.createElement("div");
    // 引数のvalue = val = 内容
    div.textContent = val;

    if (person === "me") {
        // 自分なら右
        div.classList.add("chat-right");
        li.classList.add("right");
        ul.appendChild(li);
        li.appendChild(div);
    } else if (person === "robot") {
        // ロボットがチャットしてる間は送信ボタンが効かない
        chatBtn.disabled = true;
        setTimeout(() => {
            // ロボットなら左
            div.classList.add("chat-left");
            li.classList.add("left");
            ul.appendChild(li);
            li.appendChild(div);
            chatCount++;
        }, 2000)
        // 2000ms = 2sごとにチャット
        chatBtn.disabled = false;
    }
}

// HTML側に記載の送信ボタンを押したときの処理の関数
function btnFunc() {
    // 空欄の場合ここで処理が終了
    if (!inputText.value) return false;
    // 先述のoutput関数の引数に代入
    output(inputText.value, "me");

    setTimeout(() => {
        // 送信後にnull
        inputText.value = "";
    }, 1);

    switch (chatCount) {
        // ロボットからの最初のメッセージが送り終わった時
        case 2:
            output("ありがとう！" + inputText.value + "さんっていうんだね、素敵な名前だね！", "robot");
            setTimeout(() => {
                output(chat[2], "robot");
            }, 2000);
            break;

        // 無心
        case 4:
            output("そうなんだ！" + inputText.value + "なんだね！", "robot");
            setTimeout(() => {
                output(chat[3], 'robot');
            }, 2000)
            setTimeout(() => {
                output(chat[4], 'robot');
            }, 4000)
            break;

        case 7:
            // 最後のの配列の中から無作為にメッセージ送信
            output("今日の運勢は" + chat[chat.length - 1][Math.floor(Math.random() * chat[chat.length - 1].length)] + "！頑張っていこう！！", "robot");
            break;

        default:
            output(chat[0],robot);
    }
}

form.addEventListener("submit", function(event){
    event.preventDefault();
    btnFunc();
});

chatBtn.addEventListener("click", function(event){
    event.preventDefault();
    btnFunc();
});

output(chat[0], "robot");

setTimeout(() => {
    output(chat[1], "robot");
}, 2000);