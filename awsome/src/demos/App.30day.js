/**
 * 30 Days of React Native
 */

import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

import MainView from '../views/MainView';

import Day1 from '../views/day1'; //bug when not stop then exit
import Day2 from '../views/day2';
import Day3 from '../views/day3';
import Day4 from '../views/day4'; //to update to groupon
import Day5 from '../views/day5';
import Day6 from '../views/day6'; //to update; RN video bug
import Day7 from '../views/day7';
import Day8 from '../views/day8'; //update animation
import Day9 from '../views/day9';
import Day10 from '../views/day10';
import Day11 from '../views/day11';
import Day12 from '../views/day12'; // update to google inbox
import Day13 from '../views/day13';
import Day14 from '../views/day14';
import Day15 from '../views/day15'; //to update to snapchat
import Day16 from '../views/day16';
import Day17 from '../views/day17';
import Day18 from '../views/day18';
import Day19 from '../views/day19';
import Day20 from '../views/day20';
import Day21 from '../views/day21';
import Day22 from '../views/day22';
import Day23 from '../views/day23';
import Day24 from '../views/day24';
import Day25 from '../views/day25'; // to update imessage UI
import Day26 from '../views/day26'; // to update imessage UI
import Day27 from '../views/day27';
import Day28 from '../views/day28';
import Day29 from '../views/day29'; //to update
import Day30 from '../views/day30';

let AppTabNavigator = createStackNavigator(
  {
    MainView: MainView,
    Day1: Day1,
    Day2: Day2,
    Day3: Day3,
    Day4: Day4,
    Day5: Day5,
    Day6: Day6,
    Day7: Day7,
    Day8: Day8,
    Day9: Day9,
    Day10: Day10,
    Day11: Day11,
    Day12: Day12,
    Day13: Day13,
    Day14: Day14,
    Day15: Day15,
    Day16: Day16,
    Day17: Day17,
    Day18: Day18,
    Day19: Day19,
    Day20: Day20,
    Day21: Day21,
    Day22: Day22,
    Day23: Day23,
    Day24: Day24,
    Day25: Day25,
    Day26: Day26,
    Day27: Day27,
    Day28: Day28,
    Day29: Day29,
    Day30: Day30,
  },
  {
    initialRouteName: 'MainView',
  },
);

export default createAppContainer(AppTabNavigator);
