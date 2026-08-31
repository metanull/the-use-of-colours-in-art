<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { timelineCountries, eventYearBuckets, usesLocalTimeline } from '../composables/useTimeline.js'
import { localiseLinks } from '../composables/useExhibitionData.js'
import { tHtml, dirFor } from '../composables/useUiStrings.js'

// Timeline entry form.
//
// Unlike a gallery, an exhibition can have a chronology of its own, and this
// one does — so this form drives the exhibition's own narrative rather than
// the worldwide country merge, and the country select is hidden. Which of the
// two is in play is `usesLocalTimeline`, never a literal here.
//
// The page stays reachable by URL even on an exhibition that offers no
// timeline at all, because legacy keeps it reachable; only the links into it
// are withheld. So this component must render sensibly with an empty event
// pool.
//
// The introduction is `txtTimeline`, which an exhibition may own or inherit
// from the shared MWNF Exhibitions layer; `tHtml` resolves that.
const router = useRouter()

const timelineText = computed(() => localiseLinks(tHtml('txtTimeline')))

const country = ref('')
const start = ref('')
const end = ref('')

function goToResults() {
  router.push({
    name: 'timeline-results',
    query: { c: country.value || 'all', start: start.value, end: end.value },
  })
}
</script>

<template>
  <div id="timeline-page">
    <div id="timeline-form">
      <select class="legacy-select" v-model="country" v-if="!usesLocalTimeline">
        <option value="" disabled>Select a Country</option>
        <option v-for="c in timelineCountries" :key="c[0]" :value="c[0]">{{ c[1] }}</option>
      </select>

      <div id="timeline-dates-container">
        <select class="legacy-select" v-model="start">
          <option value="" disabled>Start Date</option>
          <option v-for="d in eventYearBuckets" :key="`s${d[0]}`" :value="d[0]">{{ d[1] }}</option>
        </select>
        <select class="legacy-select" v-model="end">
          <option value="" disabled>End Date</option>
          <option v-for="d in eventYearBuckets" :key="`e${d[0]}`" :value="d[0]">{{ d[1] }}</option>
        </select>
      </div>

      <div id="timeline-go">
        <button class="legacy-button" @click="goToResults()">Go</button>
      </div>
    </div>

    <div id="timeline-description" class="prose" :dir="dirFor('txtTimeline')" v-html="timelineText"></div>
  </div>
</template>

<style scoped>
#timeline-page { display: flex; background: #fff; width: 100%; min-height: 400px; }
#timeline-form { display: flex; flex-direction: column; width: 40%; padding: 50px; max-width: 350px; }
#timeline-dates-container { display: flex; gap: 10px; }
#timeline-go { margin-top: 16px; }
#timeline-description { width: 60%; padding: 50px 75px 50px 0; line-height: 1.55; }
#timeline-description a { color: var(--link-blue); }

@media only screen and (max-width: 849px) {
  #timeline-page { flex-direction: column; }
  #timeline-form, #timeline-description { width: 100%; max-width: none; padding: 30px; }
}
</style>
