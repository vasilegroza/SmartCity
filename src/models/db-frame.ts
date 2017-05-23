export class DbFrame{
    lastValue:number;
    average:number = 0;
    values:number = 0;
    iterations:number = 0;

    constructor(average:number,
                iterations:number,
                values:number,
                lastValue:number){

                    this.average = average;
                    this.iterations = iterations;
                    this.values = values;
                    this.lastValue = lastValue;
                }
}