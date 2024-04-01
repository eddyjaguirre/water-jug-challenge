function fill(buckets, key, bucketCapacity) {
  return {
    ...buckets,
    [key]: bucketCapacity,
    explanation: `Fill bucket ${key}`
  }
}

function empty(buckets, key) {
  return {
    ...buckets,
    [key]: 0,
    explanation: `Empty bucket ${key}`
  }
}

function transfer(buckets, fromKey, toCapacity) {
  const toKey = fromKey === 'x' ? 'y' : 'x';

  const emptySpaceInReceivingBucket = toCapacity - buckets[toKey];
  const amountToTransfer = Math.min(emptySpaceInReceivingBucket, buckets[fromKey])

  return {
    [fromKey]: buckets[fromKey] - amountToTransfer,
    [toKey]: buckets[toKey] + amountToTransfer,
    explanation: `Transfer from bucket ${fromKey} to bucket ${toKey}`
  }
}

// finds the greates common divisor between two numbers a and b
function gcd(a, b) {
  if (!b) {
    return a;
  }
  return gcd(b, a % b)
}

// Using Breadth First Search to find the shortest path from the starting
// point {x: 0, y:0} to the desired point {x: target, y: n} || {x: n, y: target}

function BFS(x, y, target) {
  const queue = [];
  const visited = new Set();

  queue.push({x: 0, y:0}) // add an initial state
  visited.add('0-0')

  while (queue.length) {
    let currentState = queue.shift(); // get the first state within the queue and delete it from the queue
    
    if (currentState.x === target || currentState.y === target) { // if target is found on either bucket
      let steps = [] // create an array for each step
      while (currentState.parent) { // backtrack from the current step going through each parent
        steps.push(currentState);   // to populate the steps
        currentState = currentState.parent
      }
      steps[0].explanation += ". SOLVED"
      steps.reverse() // reverse it since we went backwards
      return steps
    }
    
    // all posible moves
    const states = new Set([
      fill(currentState, 'x', x),     // fill X
      fill(currentState, 'y', y),     // fill Y
      empty(currentState, 'x'),       // empty X
      empty(currentState, 'y'),       // empty Y
      transfer(currentState, 'x', y), // transfer from X to Y
      transfer(currentState, 'y', x), // transfer from Y to X
    ])

    for (let state of states) { // iterate through all states
      let key = `${state.x}-${state.y}` // create a key to check if this state was visited
      if (!visited.has(key)) { // if it wasn't visited
        visited.add(key) // add it to the visited Set
        queue.push({ // and push this state to the queue
          ...state,
          parent: currentState // with the current state as its parent
        })
      }
    }

  }
  return [];
}

export function calculateSteps(bucketX, bucketY, amountWanted) {
  if (amountWanted > bucketX && amountWanted > bucketY) {
    return [] // amount wanted can't be greater than any bucket
  }
  if (amountWanted <= 0 || bucketX <= 0 || bucketY <= 0) {
    return [] // no value should be less than 0
  }
  if (amountWanted % gcd(bucketX, bucketY) !== 0) {
    return [] // amount has to be divisible by the greatest common divisor of both buckets
  }
  
  let _steps = []

  _steps = BFS(bucketX, bucketY, amountWanted);

  return _steps;
}