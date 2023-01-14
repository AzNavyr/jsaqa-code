const {
    showCode,
    checkTicketDataAfterBooking,
    checkTicketDataBeforeBooking,
    chooseAndClickChair,
    book,
    chooseDay,
    chooseTimeAndFilm,
    checkUrl,
    codeIsVisible,
} = require("./lib/commands");
const {getTomorrowDay} = require('./lib/util');
const puppeteer = require('puppeteer');
const {downloadBrowser} = require("puppeteer/lib/cjs/puppeteer/node/install");

let page;

describe('Ticket booking test', () => {
    beforeEach(async () => {
        page = await downloadBrowser();
        page = await browser.newPage()
        await page.goto("http://qamid.tmweb.ru/client/index.php");
    });

    afterEach(async () => {
        await page.close();
    });

    test.only("Positive - Should book ticket (Film 3 - Hercules - 14:00)  - tomorrow", async () => {
        // тестовые данные
        const day = getTomorrowDay();
        const film = '"Фильм 3"';
        const filmForEqual = film.slice(1, -1);
        const hallForEqual = "Hercules";
        const time = '"14:00"';
        const timeForEqual = time.slice(1, -1);
        const row = 7;
        const chair = 2;
        const expectedUrlAfterAttemptOfBooking =
            "http://qamid.tmweb.ru/client/payment.php";
        // выбираем день недели
        await chooseDay(page, day);
        // выбираем время для конкретного фильма
        await chooseTimeAndFilm(page, filmForEqual, timeForEqual);
        // проверям, действительно ли мы выбираем место для конкретного фильма и конкретного сеанса
        await checkTicketDataBeforeBooking(
            page,
            filmForEqual,
            timeForEqual,
            hallForEqual
        );
        // выбираем и кликаем место
        await chooseAndClickChair(page, row, chair);
        // нажимаем забронировать
        await book(page);
        await page.waitForNavigation();
        // проверка перехода на страницу информации о забронированных билетах
        await page.waitForSelector(".ticket__check-title", { timeout: 30000 });
        await checkUrl(page, expectedUrlAfterAttemptOfBooking);
        // проверка информации о забронированном билете
        await checkTicketDataAfterBooking(page, filmForEqual, hallForEqual);
        // показать код (это приводит к отправке данных на сервер, место будет отмечено, как забронированное)
        await showCode(page);
        // проверка, что код виден
        await codeIsVisible(page);
    });


    test("Positive - Should book ticket (Logan - TEST HALL - 19:00)  - tomorrow", async () => {
        // тестовые данные
        const day = getTomorrowDay();
        const film = '"Логан"';
        const filmForEqual = film.slice(1, -1);
        const hallForEqual = "TEST HALL";
        const time = '"19:00"';
        const timeForEqual = time.slice(1, -1);
        const row = 6;
        const chair = 3;
        const expectedUrlAfterAttemptOfBooking =
            "http://qamid.tmweb.ru/client/payment.php";
        // выполнение теста
        await chooseDay(page, day);
        await chooseTimeAndFilm(page, film, time);
        await checkTicketDataBeforeBooking(
            page,
            filmForEqual,
            timeForEqual,
            hallForEqual
        );
        await chooseAndClickChair(page, row, chair);
        await book(page);
        await page.waitForNavigation();
        await page.waitForSelector(".ticket__check-title", { timeout: 60000 });
        await checkUrl(page, expectedUrlAfterAttemptOfBooking);
        await checkTicketDataAfterBooking(page, filmForEqual, hallForEqual);
        await showCode(page);
        await codeIsVisible(page);
    });

    test("Negative - Should not book booked ticket (Film 3 - holl 3 - 12:00)  - tomorrow", async () => {
        // тестовые данные
        const day = getTomorrowDay();
        const film = '"Фильм 3"';
        const filmForEqual = film.slice(1, -1);
        const hallForEqual = "Зал3";
        const time = '"12:00"';
        const timeForEqual = time.slice(1, -1);
        const row = 3;
        const chair = 1;
        const expectedUrlAfterAttemptOfBooking =
            "http://qamid.tmweb.ru/client/hall.php";
        // выполнение теста
        await chooseDay(page, day);
        await chooseTimeAndFilm(page, film, time);
        await checkTicketDataBeforeBooking(
            page,
            filmForEqual,
            timeForEqual,
            hallForEqual
        );
        await chooseAndClickChair(page, row, chair);
        await book(page);
        // проверка перехода на другую страницу - остается на преждней странице спестя некоторое время
        const finalSelector = await page.$(".ticket__check-title");
        expect(finalSelector).toEqual(null);
        await checkUrl(page, expectedUrlAfterAttemptOfBooking);
    });
})