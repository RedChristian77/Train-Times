
function addTrain() {
    let traininfo = document.getElementsByClassName("input");
    let newTrain = document.createElement("tr");
    for (i = 0; i < traininfo.length; i++) {
        let row = document.createElement("th");
        row.textContent = traininfo[i].value;
        newTrain.append(row)
    }
    //current time
    let first = moment(traininfo[2].value, "HH:mm");
    
    let now = moment();

    let minutestill = now.diff(first, 'minutes');

    let last = minutestill % traininfo[3].value;
    let diff = traininfo[3].value - last;

    let nextArrival = now.add(diff, 'minutes');
    let arrivalTime = nextArrival.format("HH:mm");

    let lastrow = document.createElement("th");

    lastrow.textContent = arrivalTime;

    newTrain.append(lastrow);

    document.getElementById("tableInfo").append(newTrain);

    myStorage = window.localStorage;

    let trainDetails = {
        TrainName : traininfo[0].value,
        Destination: traininfo[1].value,
        FirstTrainTime: traininfo[2].value,
        Frequency: traininfo[3].value,
    }

    let striged = JSON.stringify(trainDetails);
    localStorage.setItem(traininfo[0].value, JSON.stringify(striged));
}

window.onload = function() {

    for(i=0, len=localStorage.length; i<len; i++){

        let key = localStorage.key(i);
        console.log(key);
        let info = localStorage.getItem(key);
        info = JSON.parse(JSON.stringify(info));
        console.log(info);

        let readd = document.createElement("tr");

        let row = document.createElement("th");
        row.textContent = info.TrainName;
        readd.append(row);

        let rowtwo = document.createElement("th");
        rowtwo.textContent = localStorage.key(i).Destination;
        readd.append(rowtwo);

        let rowthree = document.createElement("th");
        rowthree.textContent = localStorage.key(i).FirstTrainTime;
        readd.append(rowthree);

        let rowfour = document.createElement("th");
        rowfour.textContent = localStorage.key(i).Frequency;
        readd.append(rowfour);


        //start of wet coding, I am sorry
        let rowfive = document.createElement("th");
        
        let first = moment(localStorage.key(i).FirstTrainTime, "HH:mm");
    
        let now = moment();
    
        let minutestill = now.diff(first, 'minutes');
    
        let last = minutestill % localStorage.key(i).Frequency;
        let diff = localStorage.key(i).Frequency - last;
    
        let nextArrival = now.add(diff, 'minutes');
        let arrivalTime = nextArrival.format("HH:mm");
    
        rowfive.textContent = arrivalTime;
    
        readd.append(rowfive);
    
        document.getElementById("tableInfo").append(readd);
    };
}