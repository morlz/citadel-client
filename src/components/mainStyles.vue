<template>
</template>

<script>
export default {}
</script>

<style lang="less">
//@import url( 'https://cdn.quilljs.com/1.2.6/quill.snow.css');

@import url('../assets/styles/flatpickr.css');
@import url( '../assets/styles/quill.snow.css');
@import url( '../assets/styles/blueimp-gallery.min.css');

@import url( 'https://fonts.googleapis.com/css?family=Roboto');

@font-face {
    font-family: 'Roboto Slab';
    src: local('Roboto Slab Thin'), local('RobotoSlab-Thin'), url('../assets/fonts/robotoslabthin.woff2') format('woff2'), url('../assets/fonts/robotoslabthin.woff') format('woff'), url('../assets/fonts/robotoslabthin.ttf') format('truetype');
    font-weight: 100;
    font-style: normal;
}
@font-face {
    font-family: 'Roboto Slab';
    src: local('Roboto Slab Light'), local('RobotoSlab-Light'), url('../assets/fonts/robotoslablight.woff2') format('woff2'), url('../assets/fonts/robotoslablight.woff') format('woff'), url('../assets/fonts/robotoslablight.ttf') format('truetype');
    font-weight: 300;
    font-style: normal;
}
@font-face {
    font-family: 'Roboto Slab';
    src: local('Roboto Slab Regular'), local('RobotoSlab-Regular'), url('../assets/fonts/robotoslabregular.woff2') format('woff2'), url('../assets/fonts/robotoslabregular.woff') format('woff'), url('../assets/fonts/robotoslabregular.ttf') format('truetype');
    font-weight: 400;
    font-style: normal;
}
@font-face {
    font-family: 'Roboto Slab';
    src: local('Roboto Slab Bold'), local('RobotoSlab-Bold'), url('../assets/fonts/robotoslabbold.woff2') format('woff2'), url('../assets/fonts/robotoslabbold.woff') format('woff'), url('../assets/fonts/robotoslabbold.ttf') format('truetype');
    font-weight: 700;
    font-style: normal;
}

* {
	&::-webkit-scrollbar-track {
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3);
		border-radius: 10px;
		background-color: #F5F5F5;
	}
	&::-webkit-scrollbar {
		width: 12px;
		background-color: #F5F5F5;
	}
	&::-webkit-scrollbar-thumb {
		border-radius: 10px;
		-webkit-box-shadow: inset 0 0 6px rgba(0,0,0,.3);
		background-color: #dadada;
	}
}

html {
    width: 100%;
}

body {
    padding: 0;
    margin: 0;
    width: 100%;
    -webkit-font-smoothing: antialiased;
    color: #666;
    font-family: Roboto, Arial, sans-serif;
    background: #F6F6F6;
    font-size: 16px;
	.contentWrapper {}
}

h2 {
    font-family: "Roboto Slab", Arial, sans-serif;
    font-size: 46px;
    font-weight: 300;
    letter-spacing: -2px;
    line-height: 58px;
    color: #444;
}

h3 {
    font-size: 30px;
    line-height: 36px;
}

input[type="password"],
input[type="text"] {
    background: transparent;
    padding: 7px;
    border: 0;
    border-bottom: 1px solid rgba(0,0,0,0.38);
    transition: all 0.2s ease-in-out;
    -webkit-tap-highlight-color: transparent;
    outline: none;
    &:focus {
        border-bottom: 1px solid #448aff;
    }
}
textarea {
    background: transparent;
    transition: border 0.2s ease-in-out;
    border: 0;
    border-bottom: 1px solid rgba(0,0,0,0.38);
    -webkit-tap-highlight-color: transparent;
    outline: none;
    &:focus {
        border-bottom: 1px solid #448aff;
    }
}

.button {
    background: #448aff;
    padding: 8px;
    color: white;
    border-radius: 3px;
    user-select: none;
    cursor: pointer;
    text-decoration: none;
}

.buttonTR {
    padding: 7px;
    border: none;
    cursor: pointer;
    font-weight: 500;
    outline: none;
    color: #444444;
    background: transparent;
    text-decoration: none;
    text-transform: uppercase;
    user-select: none;
}
.buttonTRb {
    .buttonTR;
    color: #4285f4;
}

.mather {
    transition: all 0.3s ease-in-out;
    box-shadow: 0 2px 2px 0 rgba(0,0,0,0.1);
    &:hover {
        box-shadow: 0 7px 9px 0 rgba(0,0,0,0.15);
    }
}

a {
    color: #448aff;
}

.boxWithIconBase {
    padding-left: 40px;
    background-repeat: no-repeat;
    background-size: auto 35px;
    background-position: 0 50%;
}


.phone {
	.boxWithIconBase;
    background-image: url("../assets/images/ic_phone_black_24px.svg");
}

.email {
	.boxWithIconBase;
    background-image: url("../assets/images/ic_email_black_24px.svg");
}

.location {
	.boxWithIconBase;
    background-image: url("../assets/images/location-pin.svg");
}

.adminIcon {
	.boxWithIconBase;
    background-image: url("../assets/images/admin-with-cogwheels.svg");
}

.prepodIcon {
	.boxWithIconBase;
    background-image: url("../assets/images/teacher.svg");
	background-size: auto 30px;
}

.userIcon {
	.boxWithIconBase;
    background-image: url("../assets/images/graduate-student-avatar.svg");
}

.emailConfirmIcon {
	.boxWithIconBase;
    background-image: url("../assets/images/mail-black-envelope-symbol.svg");
}

.noImage {
    background-repeat: no-repeat;
    background-image: url("../assets/images/portrait.svg");
    background-position: 50% 20px;
}


.adminButton {
    display: grid;
    justify-content: start;
    grid-gap: 10px;
    grid-auto-flow: column;
    margin-top: 20px;
}

.edit {
    .title {
        width: 100%;
        box-sizing: border-box;
        font-family: "Roboto Slab", Arial, sans-serif;
        font-size: 46px;
        font-weight: 300;
        letter-spacing: -2px;
        line-height: 58px;
        color: #444;
        margin: 10px 0;
        padding: 0;
    }
}

article {
    margin: 0 auto;
    padding: 20px;
    max-width: 1400px;
    box-sizing: border-box;
    .content {
        text-align: justify;
        p {
            text-indent: 1.5em;
        }
    }
    section {
        width: 100%;
        box-sizing: border-box;
    }
}

.pageChange-enter-active,
.pageChange-leave-active {
    transition: all 0.2s ease-in-out;
}
.pageChange-enter,
.pageChange-leave-to {
    opacity: 0;
}

.tooltip {
	position: relative;
    &:before {
        content: attr(data-tooltip);
		text-align: center;
        box-sizing: border-box;
        display: block;
        background: #fff;
        padding: 20px;
        position: absolute;
		pointer-events: none;
        left: 50%;
        top: -30px;
        margin-left: -150px;
        width: 300px;
        height: 65px;
        line-height: 25px;
        border-radius: 5px;
        opacity: 0;
        transition: 0.25s ease-in-out;
		box-shadow: 0 7px 9px 0 rgba(0,0,0,0.15);
    }
    &:after {
        content: '';
        display: block;
        position: absolute;
		pointer-events: none;
        top: 35px;
        left: 50%;
        margin-left: -8px;
        height: 0;
        width: 0;
        border-left: 8px solid transparent;
        border-right: 8px solid transparent;
        border-top: 8px solid #fff;
        transition: 0.25s ease-in-out;
        opacity: 0;
    }
    &:hover:before {
        opacity: 1;
        top: -80px;
    }
    &:hover:after {
        opacity: 1;
        top: -15px;
    }
}
@media (min-width: 1400px) {
    article {
        width: 70%;
    }
}
@media (max-width: 1400px) {
    article {
        width: 80%;
    }
}
@media (max-width: 800px) {
    article {
        margin: 0;
        width: 100%;
    }
}
</style>
