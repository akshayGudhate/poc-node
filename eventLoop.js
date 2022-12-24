//////////////////////////////
//        event loop        //
//////////////////////////////

//
// Event Loop: --> stack, heap, event loop, queue, micro queue, thread pool
//

// array of oending tasks
const timers = [];
const osTasks = [];
const longRunningOperations = [];


// aggregate code and run
myNodeFile.runAllCodeContemt();


// check event loop need to run one more time
const isNextTick = () => {
    // 1. check timers... setTimeout, setInterval, setImmidiate
    // 2. check os tasks... like listning port and handling requests
    // 3. check long runnung operation... like fs module
    return timers.length || osTasks.length || longRunningOperations.length;
};


// actual event loop
while (isNextTick()) {
    // 1. run pending timers
    // 2. run pending os tasks or long runnung operation
    // 3. pause execution and continue when
    //      --> os task is done
    //      --> long runnung operation is done
    //      --> timer is complete
    // 4. check close events
};


//
// extit back to terminal --> exit the node process
//
