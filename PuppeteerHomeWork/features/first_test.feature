Feature: Ticket Booking - Tests

  Attempts to book tickets (different films, days, time, halls)

  Scenario: User should book ticket (Film 3 - Hercules - 14:00)  - tomorrow
    Given user is on start page "http://qamid.tmweb.ru/client/index.php"
    When user choose day "Tomorrow"
    And user choose film "Фильм 3" and time "14:00"
    And user choose raw "8" and chair 3" and click it
    And user press Book
    Then user on "http://qamid.tmweb.ru/client/payment.php" page
    And user sees the film suggested "Фильм 3", the hall suggested "Hercules" on payment page
    When user press Show code
    Then user can see QR code

  Scenario: User should book ticket (Logat - hall 1 - 19:00)  - tomorrow
    Given user is on start page "http://qamid.tmweb.ru/client/index.php"
    When user choose day "Tomorrow"
    And user choose film "Логан" and time "19:00"
    And user choose raw "8" and chair "3" and click it
    And user press Book
    Then user on "http://qamid.tmweb.ru/client/payment.php" page
    And user sees the film suggested "Логан", the hall suggested "Зал 1" on payment page
    When user press Show code
    Then user can see QR code

  Scenario: User should NOT book booked ticket (Film 3 - Hercules - 14:00)  - tomorrow
    Given user is on start page "http://qamid.tmweb.ru/client/index.php"
    When user choose day "Tomorrow"
    And user choose film "Фильм 3" and time "14:00"
    And user choose raw "8" and chair "3" and click it
    And user press Book
    Then user should not see the page title "Электорнный билет"
    And user should remain on the "http://qamid.tmweb.ru/client/hall.php" page