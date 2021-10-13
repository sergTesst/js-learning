const cl = console.log;

function internationalization() {
  //strings
  //when we compare strings code symbols are compared. This is not correct
  //thus we have ё > я and а > Я

  //date have different format
  // somewhere we write 31.12.2021 (Ukraine) or 12/21/2021 (USA)

  //numbers
  // in some countries displays numbers, in others hieroglyphs,
  // long numbers divided by space or by commas

  // main objects

  // Intl.Collator
  // can truly compare strings

  // Intl.DateTimeFormat
  // can form a date and time according to desired language

  // Intl.NumberFormat
  // can form a number according to desired language

  // localeMatcher is an auxiliary option, that can be pointed out
  // it has two values
  // "lookup"
  // "best fit"

  //Strings, Intl.Collator

  function collatorSample1() {


		// language registory
		//http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry

    let collator = new Intl.Collator();
    cl(`ёжик > яблоко`, "ёжик" > `яблоко`);
    cl(
      `collator.compare('ёжик', 'яблоко')) `,
      collator.compare("ёжик", "яблоко")
    );

    cl(`collator.compare('ЁжиК', 'ёжик')) `, collator.compare("ЁжиК", "ёжик"));

    let collator1 = new Intl.Collator(undefined, {
      sensitivity: "accent",
    });

    cl(
      `collator1.compare('ЁжиК', 'ёжик')) `,
      collator1.compare("ЁжиК", "ёжик")
    );
  }

  function dateTimeCollator() {
    //init
    // let formatter = new Intl.DateTimeFormat([locales, [options]]);

    let date = new Date(2014, 11, 31, 12, 30, 0);

    let formatter = new Intl.DateTimeFormat("ru");
    cl("formatter.format(date) ", formatter.format(date));

    let formatterUs = new Intl.DateTimeFormat("en-US");
    cl("formatterUs.format(date) ", formatterUs.format(date));

    let formatterRuLong = new Intl.DateTimeFormat("ru", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

    cl("formatterRuLong.format(date) ", formatterRuLong.format(date));

    let formatterRuOnlyTime = new Intl.DateTimeFormat("ru", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });

    cl("formatterRuOnlyTime.format(date) ", formatterRuOnlyTime.format(date));
  }

  function numberFormat() {
    // let formatterNum = new Intl.NumberFormat([locales, [, options]]);
    //formatter.format(number);

    let formatterDefault = new Intl.NumberFormat("ru");

    cl(
      `formatterDefault.format(1234567890.123) `,
      formatterDefault.format(1234567890.123)
    );

    let formatter3SignificantNum = new Intl.NumberFormat("ru", {
      maximumSignificantDigits: 3,
    });

    cl(
      `formatter3SignificantNum.format(1234567890.123) `,
      formatter3SignificantNum.format(1234567890.123)
    );

    let formatterCurrency = new Intl.NumberFormat("ru", {
      style: "currency",
      currency: "GBP",
    });

    cl(`formatterCurrency.format(1234.5) `, formatterCurrency.format(1234.5));
    let formatterCurrencyWithFractionDigits = new Intl.NumberFormat("ru", {
      style: "currency",
      currency: "GBP",
      minimumFractionDigits: 2,
    });

    cl(
      `formatterCurrencyWithFractionDigits.format(1234.52210) `,
      formatterCurrencyWithFractionDigits.format(1234.52210)
    );
  }

	function localeCompareInStrings(){
		let str = `ёжик`;
		cl(`str.localeCompare('яблоко', 'ru') `,str.localeCompare('яблоко', 'ru'));
	
		let date = new Date(2014, 11, 31, 12, 30, 0);

		cl(`date.toLocaleString('ru',{year:'numeric',month: 'long'})`,
			date.toLocaleString('ru',{
				year:'numeric',
				month: 'long'
			})
		)
	}

	// localeCompareInStrings();

  // numberFormat();

  // dateTimeCollator();

  collatorSample1();
}

function tasks(){
	
	function sortLocaleArray(){
		let animals = ["тигр", "ёж", "енот", "ехидна", "АИСТ", "ЯК"];
		
		let collator1 = new Intl.Collator('ru', {
      sensitivity: "accent",
    });

		animals.sort((a1, a2)=>{
			return collator1.compare(a1, a2);
		});

		cl(`
		["тигр", "ёж", "енот", "ехидна", "АИСТ", "ЯК"] sorted
		`,
		animals)

	}

	sortLocaleArray();
}

(function main() {
	
	tasks();

  // internationalization();
})();
