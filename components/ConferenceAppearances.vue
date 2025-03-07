<!-- Conference Appearances Component -->
<template>
  <div class="col-span-1 md:col-span-2 mt-14">
    <h2 class="text-3xl font-bold mb-10" id="conference-appearances">Conference Appearances</h2>
    <p class="text-lg md:text-xl mb-5 md:mb-7">
      I am an international keynote speaker. I like to do live coding on stage and demonstrate real-life examples and problem solutions. If you’d like to book me for your conference, please don’t hesitate to <NuxtLink to="https://links.filiphric.com" class="text-lime">contact me</NuxtLink> to discuss details. You can find the basic information about my conference appearances in the <NuxtLink to="/speaking-policy" class="text-lime">speaking policy document</NuxtLink>.
    </p>
    <!-- Tabs -->
    <div class="mb-4 border-b border-gray-200">
      <ul class="flex flex-wrap -mb-px text-sm font-medium text-center" role="tablist">
        <li v-for="year in Object.keys(conferences).sort().reverse()" :key="year" class="mr-2" role="presentation">
          <button 
            :class="[
              'inline-block p-4 rounded-t-lg',
              selectedYear === year 
                ? 'text-lime border-b-2 border-lime' 
                : 'hover:text-gray-500 hover:border-gray-300'
            ]"
            :id="`tab-${year}`"
            role="tab"
            :aria-selected="selectedYear === year"
            :aria-controls="`panel-${year}`"
            @click="selectedYear = year"
          >
            {{ year }}
          </button>
        </li>
      </ul>
    </div>

    <!-- Table Panels -->
    <div v-for="year in Object.keys(conferences).sort().reverse()" :key="year" role="tabpanel" :id="`panel-${year}`" :aria-labelledby="`tab-${year}`" :class="{ hidden: selectedYear !== year }">
      <div class="overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead>
            <tr>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:px-6">Event Name</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:px-6">Date</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:px-6">Type</th>
              <th class="px-4 py-3 text-left text-sm font-semibold text-gray-900 dark:text-white sm:px-6">Location</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-gray-200 dark:divide-gray-700">
            <tr v-for="event in conferences[year]" :key="event.name">
              <td class="whitespace-nowrap px-4 py-4 text-sm sm:px-6">{{ event.name }}</td>
              <td class="whitespace-nowrap px-4 py-4 text-sm sm:px-6">{{ event.date }}</td>
              <td class="whitespace-nowrap px-4 py-4 text-sm sm:px-6">
                <div class="flex gap-1 flex-wrap">
                  <span 
                    v-for="type in (Array.isArray(event.type) ? event.type : [event.type])" 
                    :key="type"
                    :class="[
                      'px-2 py-1 rounded-full text-xs font-medium',
                      {
                        'bg-lime/20 text-lime-500': type === 'Talk',
                        'bg-blueberry-500/20 text-blueberry-700 dark:text-blueberry-300': type === 'Workshop',
                        'bg-mint-500/20 text-mint-700 dark:text-mint-300': type === 'Podcast',
                        'bg-tangerine-500/20 text-tangerine-700 dark:text-tangerine-300': type === 'Panel discussion',
                        'bg-punch-500/20 text-punch-700 dark:text-punch-300': type === 'Moderator',
                        'bg-cheese-500/20 text-cheese-700 dark:text-cheese-300': type === 'Keynote'
                      }
                    ]"
                  >
                    {{ type }}
                  </span>
                </div>
              </td>
              <td class="whitespace-nowrap px-4 py-4 text-sm sm:px-6">{{ event.location }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script setup>
const selectedYear = ref('2025')

const conferences = {
  '2025': [
    {
      name: 'Quality Week',
      date: 'February 25-27',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'TestCrunch',
      date: 'April 1-2',
      location: 'Brno, Czech Republic',
      type: 'Talk'
    },
    {
      name: 'StarEAST',
      date: 'April 28-May 2',
      location: 'Orlando, Florida',
      type: 'Workshop'
    },
    {
      name: 'CODECON Bratislava',
      date: 'June 5-7',
      location: 'Bratislava, Slovakia',
      type: 'Moderator'
    }
  ],
  '2024': [
    {
      name: 'JavaScript Master Podcast',
      date: 'January 7',
      location: 'Online',
      type: 'Podcast'
    },
    {
      name: 'Automation Guild',
      date: 'February 5-9',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'Nikolay Advolodkin\'s Podcast',
      date: 'February 23',
      location: 'Online',
      type: 'Podcast'
    },
    {
      name: 'TestCrunch',
      date: 'March 28',
      location: 'Brno, Czech Republic',
      type: 'Talk'
    },
    {
      name: 'StarEAST',
      date: 'April 29-May 3',
      location: 'Orlando, Florida',
      type: ['Talk', 'Panel discussion', 'Workshop']
    },
    {
      name: 'JS Heroes',
      date: 'May 23-24',
      location: 'Cluj-Napoca, Romania',
      type: ['Talk', 'Panel discussion']
    },
    {
      name: 'DevTalks',
      date: 'May 29-30',
      location: 'Bucharest, Romania',
      type: 'Talk'
    },
    {
      name: 'daily.dev',
      date: 'June 4',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'CODECON',
      date: 'June 5',
      location: 'Bratislava, Slovakia',
      type: 'Moderator'
    },
    {
      name: 'TechLeaders Unplugged',
      date: 'July 24',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'Testμ Conference',
      date: 'August 12',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'QA Global Day',
      date: 'August 23',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'GeoSTQB Tester Day',
      date: 'September 2',
      location: 'Tbilisi, Georgia',
      type: 'Talk'
    },
    {
      name: 'StarWEST',
      date: 'September 23-27',
      location: 'Anaheim, California',
      type: 'Workshop'
    },

    {
      name: 'CypressConf',
      date: 'October 22-23',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'AgileTD',
      date: 'November 19-22',
      location: 'Potsdam, Germany',
      type: ['Talk', 'Panel discussion']
    },
    {
      name: 'MakeITFun podcast',
      date: 'December 13',
      location: 'Online',
      type: 'Podcast'
    }
  ],
  '2023': [
    {
      name: 'The Test Tribe',
      date: 'January 11',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'Worqference',
      date: 'January 24-26',
      location: 'Online',
      type: 'Workshop'
    },
    {
      name: 'Cypress Webinar on API Testing',
      date: 'February 27',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'TAU Conference',
      date: 'March 8',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'Let the engineers speak',
      date: 'March 18',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'TestCrunch',
      date: 'March 29-31',
      location: 'Brno, Czech Republic',
      type: 'Talk'
    },
    {
      name: 'CTM Meetup Berlin',
      date: 'May 24',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'Geekle QA Summit',
      date: 'May 30-31',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'Frontend test fest',
      date: 'June 7',
      location: 'Online',
      type: 'Keynote'
    },
    {
      name: 'Cypress Ambassador Round Table',
      date: 'June 27',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'We are developers congress',
      date: 'July 27-28',
      location: 'Berlin, Germany',
      type: 'Workshop'
    },
    {
      name: 'Symphony Solutions event',
      date: 'August 23',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'Tester’s day GEOSTQB',
      date: 'September 9',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'Testing United',
      date: 'September 3-4',
      location: 'Prague, Czech Republic',
      type: 'Talk'
    },
    {
      name: 'TestFlix',
      date: 'September 24',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'We Test Athens',
      date: 'October 5-7',
      location: 'Athens, Greece',
      type: 'Talk'
    },
    {
      name: 'Tesena Fest',
      date: 'October 12',
      location: 'Prague, Czech Republic',
      type: 'Talk'
    },
    {
      name: 'Joe Colantonio Podcast',
      date: 'November 13',
      location: 'Online',
      type: 'Podcast'
    },
    {
      name: 'Agile Testing Days',
      date: 'November 13-16',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'WeAreDevs Online event',
      date: 'November 29',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'TestJS Summit',
      date: 'December 7',
      location: 'Berlin, Germany',
      type: 'Talk'
    },
    {
      name: 'Test Tribe Live Testing',
      date: 'December 15',
      location: 'Online',
      type: 'Talk'
    }
  ],
  '2022': [
    {
      name: 'Applitoools webinar - Getting Started with Cypress',
      date: 'January 12',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'Future of Testing',
      date: 'February 24',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'Testing United',
      date: 'March 15-16',
      location: 'Prague, Czech Republic',
      type: 'Talk'
    },
    {
      name: 'StarEAST',
      date: 'April 23-27',
      location: 'Orlando, Florida',
      type: 'Talk'
    },
    {
      name: 'Testmu conference',
      date: 'August 25',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'Cypress vs. Playwright rematch',
      date: 'September 8',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'Tester’s day GEOSTQB',
      date: 'September 9',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'TestJS Summit',
      date: 'October 3-4',
      location: 'Online',
      type: 'Talk'
    }    
  ],
  '2021': [
    {
      name: 'TestJS Summit',
      date: 'January 28-29',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'GeoSTQB Tester Day',
      date: 'September 9',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'SANAE Beer.EX',
      date: 'October 7',
      location: 'Bratislava, Slovakia',
      type: 'Workshop'
    },
    {
      name: 'Mini testing united',
      date: 'November 11',
      location: 'Online',
      type: 'Talk'
    },
    {
      name: 'TAU Homecoming',
      date: 'December 1-2',
      location: 'Online',
      type: 'Talk'
    }
  ],
  '2020': [
    {
      name: 'Sanae Beer meetup',
      date: 'June 25',
      location: 'Bratislava, Slovakie',
      type: 'Talk'
    },
    {
      name: 'Future of Testing',
      date: 'November 18',
      location: 'Online',
      type: 'Talk'
    }
  ],
  '2019': [
    {
      name: 'Testing Cup',
      date: 'June 10-11',
      location: 'Poznan, Poland',
      type: 'Talk'
    },
    {
      name: 'Sanae Beer.ex Conference',
      date: 'October 10',
      location: 'Bratislava, Slovakie',
      type: 'Talk'
    },
    {
      name: 'TestCrunch',
      date: 'October 24-25',
      location: 'Brno, Czech Republic',
      type: 'Workshop'
    },
    {
      name: 'QA Meetup',
      date: 'November 5',
      location: 'Bratislava, Slovakia',
      type: 'Talk'
    },
    {
      name: 'WeAreDevelopers congress',
      date: 'November 28',
      location: 'Vienna, Austria',
      type: 'Moderator'
    }
  ],
  '2018': [
    {
      name: '[Pro]Test! meetup',
      date: 'January 30',
      location: 'Prague, Czech Republic',
      type: 'Talk'
    },
    {
      name: 'Testing United',
      date: 'November 19',
      location: 'Bratislava, Slovakia',
      type: 'Talk'
    }
  ],
  '2017': [
    {
      name: 'Tesena Fest',
      date: 'October 10',
      location: 'Prague, Czech Republic',
      type: 'Talk'
    }
  ]
}
</script> 