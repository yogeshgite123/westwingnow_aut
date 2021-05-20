Feature: User can add or remove product from wishlist

  Scenario: As a user, I can add or remove product from wishlist
    Given I am on the WestwingNow home page
    When I search for "möbel"
    Then I should see product listing page with a list of products
    When I click on wishlist icon of the first found product
    Then I should see the login/registration overlay
    When I switch to login form of the overlay
    And I log in with "test_configuration"
    Then the product should be added to the wishlist
    And I go to the wishlist page
    And I delete the product from my wishlist