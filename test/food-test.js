require('./food-test')
var assert    = require('chai').assert;
var webdriver = require('selenium-webdriver');
var test      = require('selenium-webdriver/testing');
var host      = "http://localhost:8080";

test.describe('our test bundle', function () {
  it('should work', function () {
    assert(true)
  });

  var driver;
  this.timeout(10000);

  test.beforeEach(function() {
    driver = new webdriver.Builder()
      .forBrowser('chrome')
      .build();
  });

  test.afterEach(function() {
    driver.quit();
  });

  test.it('should allow me to open the foods.html page', function() {
    driver.get(`${host}/foods.html`);

    driver.getCurrentUrl().then(function(url) {
      assert.equal(url, `${host}/foods.html`)
    });
  });

  test.it('should allow me to fill in the name and number of calories', function() {
    driver.get(`${host}/foods.html`);

    var foodName = driver.findElement({id: 'new-food-name-field'});
    foodName.sendKeys('Pizza');

    foodName.getAttribute('value').then(function(value) {
      assert.equal(value, 'Pizza');
    });

    var foodCalories = driver.findElement({id: 'new-food-calories-field'});
    foodCalories.sendKeys('300');

    foodCalories.getAttribute('value').then(function(value) {
      assert.equal(value, '300');
    });
  });
});
