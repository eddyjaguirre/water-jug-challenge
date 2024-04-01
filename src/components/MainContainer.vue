<template>
  <v-container class="fill-height">
    <v-responsive
      class="align-centerfill-height mx-auto"
      max-width="900"
    >
      <v-row>
        <v-col cols="12">
          <h1>Water jug challenge</h1>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4">
          <v-text-field
            label="Bucket X"
            type="number"
            v-model.number="bucketX"
            :rules="[rules.positive]"
          ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
          label="Bucket Y"
          type="number"
          v-model.number="bucketY"
          :rules="[rules.positive]"
        ></v-text-field>
        </v-col>
        <v-col cols="12" md="4">
          <v-text-field
          label="Amount wanted"
          type="number"
          v-model.number="amountWanted"
          :rules="[rules.positive]"
        ></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-table>
            <thead>
              <tr>
                <th>Bucket X</th>
                <th>Bucket Y</th>
                <th>Explanation</th>
              </tr>
            </thead>
            <tbody>
              <tr v-if="steps.length === 0">
                <td colspan="3" class="font-weight-bold text-center">
                  No solution
                </td>
              </tr>
              <tr v-for="(step, id) in steps" :key="id">
                <td>{{ step.x }}</td>
                <td>{{ step.y }}</td>
                <td>{{ step.explanation }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-col>
      </v-row>
    </v-responsive>
  </v-container>
</template>
<script setup>
import { ref, computed } from 'vue';
import { calculateSteps } from '@/helpers/calculateSteps.js';

const bucketX = ref(null);
const bucketY = ref(null);
const amountWanted = ref(null);

const rules = ref({
  positive: value => value > 0 || 'Value should be greater than 0'
})

const steps = computed(() => {
  return calculateSteps(bucketX.value, bucketY.value, amountWanted.value);
})

</script>