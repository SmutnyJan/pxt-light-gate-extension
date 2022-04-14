enum Deviation {
    //% block="Malá"
    Small = 10,
    //% block="Střední"
    Medium = 20,
    //% block="Velká"
    Large = 30,

}

//% weight=100 color=#a0a803 icon="\uf030" block="Světelná brána"
namespace lightGate {
    let toleration = Deviation.Medium
    let lightLevel = 0
    let methodLock = false

    /**
    * Spustí kalibraci a nastaví toleranci
    * @tol Tolerance hladiny světla (0-255)
    */
    //% block="Zkalibruj a nastav toleranci %tol"
    //% tol.min=0 tol.max=255

    export function calibrate(dev: Deviation): void {
        let sumOfMeasurements = 0;
        for (let i = 0; i < 10; i++) {
            sumOfMeasurements += input.lightLevel()
        }
        lightLevel = Math.round(sumOfMeasurements / 10)
        toleration = dev;
    }

    /**
    * Zkontroluje, jestli došlo k porušení hladiny světla
    * @action Různé příkazy které se provedou, pokud dojde k porušení hladiny světla
    */
    //% block="Při porušení hladiny světla"
    export function onLightLevelDrop(action: () => void) {
        const eventID = 111 + Math.randomRange(0, 100);

        control.onEvent(eventID, 0, function () {
            control.inBackground(() => {
                methodLock = true
                action()
                methodLock = false

            })
        })

        control.inBackground(() => {
            while (true) {
                let measuredLightLevel = input.lightLevel();
                if (!methodLock && (measuredLightLevel > lightLevel + toleration || measuredLightLevel < lightLevel - toleration)) {
                    control.raiseEvent(eventID, 1)
                }
                basic.pause(20)
            }
        })
    }

}