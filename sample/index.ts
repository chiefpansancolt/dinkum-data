import {
  allDailyMilestones,
  animals,
  bugs,
  calendar,
  clothing,
  fish,
  licenses,
  milestones,
  seeds,
} from '../src';

console.log('--- Animals ---');
console.log('total:', animals().count());
console.log('domesticable:', animals().domesticable().count());

console.log('\n--- Museum Pedia ---');
console.log('fish:', fish().count());
console.log('rare fish:', fish().byRarity('Rare').count());
console.log(
  'summer fish (highest sell price):',
  fish().bySeason('Summer').sortByBaseSellPrice().first()?.name,
);
console.log('bugs:', bugs().count());

console.log('\n--- Licenses ---');
console.log('total licenses:', licenses().count());
console.log('total permit points:', licenses().totalPermitPoints());

console.log('\n--- Milestones ---');
console.log('total milestones:', milestones().count());
console.log('total permit points:', milestones().totalPermitPoints());

console.log('\n--- Seeds ---');
console.log(
  'spring seeds (fastest growth first):',
  seeds().bySeason('Spring').sortByGrowthPeriod().count(),
);

console.log('\n--- Clothing ---');
console.log('hats:', clothing().bySlot('Head').count());

console.log('\n--- Calendar ---');
console.log('total days:', calendar().count());
console.log("Fletch's birthday:", calendar().getBirthday('Fletch'));

console.log('\n--- Daily Milestones ---');
console.log('total tasks across all categories:', allDailyMilestones().length);
