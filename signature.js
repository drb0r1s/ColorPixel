// -------------------------- //
// BROUGHT TO YOU BY DRB0R1S //
// ------------------------ //

// NOTE: You don't have to understand this code here.
// It is written for the signature of the developer, thus won't be explained.

const signatures = [
    "brought to you by <logo>",
    "<logo> on the track",
    "<logo> did it for real",
    "we got <logo> on the track",
    "<logo> took it to 10",
    "developed by <logo>",
    "<logo> said that it's as easy as it looks",
    "freestyled by <logo>",
    "why is <logo> so good at coding?",
    "it's alright, <logo> did it",
    "made by <logo>",
    "written by <logo>",
    "coded by <logo>",
    "<logo>'s original application",
    "<logo>'s original idea",
    "all rights reserved, <logo>",
    "<logo>",
    "<logo> got it running",
    "<logo>, <logo>",
    "<logo>, <logo>, <logo>",
    "good, better, <logo>",
    "good job <logo>",
    "<logo> made it, right?",
    "it's fine, <logo>",
    "it's okay, <logo>, but nothing special tho",
    "drb0r1s <logo> drb0r1s <logo> drb0r1s <logo> drb0r1s",
    "<logo>: the way it's meant to be coded"
];

let usedSignatures = [];

const signature = document.getElementById("signature");
const img = "<img src='./DRB0R1S.png' alt='DOKTOR'>";

setSignature();

setInterval(() => {
    signature.style.opacity = "0";

    setTimeout(() => {
        signature.style.opacity = "";
        setSignature();
    }, 1000);
}, 10000);

function setSignature() {
    const signatureContent = generateSignature();
    
    if(usedSignatures.length + 1 === signatures.length) usedSignatures = [];
    usedSignatures.push(signatureContent);

    signature.innerHTML = signatureContent;
}

function generateSignature() {
    let signatureString = signatures[Math.floor(Math.random() * signatures.length)];
    signatureString = signatureString.replaceAll("<logo>", `</strong>${img}<strong>`);

    const completedSignature = `<strong>${signatureString}</strong>`;
    
    if(usedSignatures.indexOf(completedSignature) > -1) return generateSignature();
    return completedSignature;
}

// -------------------------- //
// BROUGHT TO YOU BY DRB0R1S //
// ------------------------ //