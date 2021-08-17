
describe("functions", function(){



  describe("clock methods", function(){

    before(async () => {
      const { CustomClock } = await import("./customClock.js");
      const customClock = new CustomClock(new Date());
    });

    it("creates clock element",  function(){
      console.log('running creates clock element')
      expect(document.querySelector('.clock-div')).not.to.equal(null);
    });

  })





  describe("pow", function() {

    it("возводит в степень n", function() {
      assert.equal(pow(2, 3), 8);
    });
  
  });
  
    
})


