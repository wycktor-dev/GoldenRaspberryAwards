export interface ProducerInterval {
    producer: string;
    interval: number;
    previousWin: number;
    followingWin: number;
}
  
  export interface ProducerWinInterval {
    min: ProducerInterval[];
    max: ProducerInterval[];
}