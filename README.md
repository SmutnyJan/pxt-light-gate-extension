# Světelná brána

## Namespace
```
lightGate
```
## Popis
Toto rozšíření dovoluje využít senzor intenzity světla pro vytvoření jednoduché světelné závory, která dokáže detekovat pohyb.
 
## Metody
### Zkalibruj a nastav toleranci %tol
```
function calibrate(dev: Deviation): void
```
- Spustí kalibraci a nastaví toleranci
- Parametry:
    - tolerance (enum)
- Bez návratové hodnoty

### Při porušení hladiny světla
```
function onLightLevelDrop(action: () => void)
```
- Zkontroluje, jestli došlo k porušení hladiny světla
- Parametry:
    - metoda (delegát)
- Bez návratové hodnoty

## Enumy
```
enum Deviation {
    Small = 10,
    Medium  = 20,
    Large = 30,
}
```

## Příklady

### Světelná brána bez zapínání/vypínání

#### Bloky
![Použítí světelné brány](https://github.com/microbit-cz/pxt-light-gate-extension/blob/master/images/easyexample.png)
#### Kód
```
lightGate.onLightLevelDrop(function () {
    music.playTone(262, music.beat(BeatFraction.Whole))
})
lightGate.calibrate(Deviation.Medium)
```
Demo  [https://github.com/microbit-cz/pxt-light-gate-demo-easy](https://github.com/microbit-cz/pxt-light-gate-demo-easy)


### Světelná brána s zapínání/vypínání
#### Bloky
![Použítí světelné brány s vypínáním a zapínáním](https://github.com/microbit-cz/pxt-light-gate-extension/blob/master/images/hardexample.png)

#### Kód
```
let jeHraZapnuta = false
input.onButtonPressed(Button.A, function () {
    if (jeHraZapnuta == false) {
        lightGate.calibrate(Deviation.Medium)
    }
    jeHraZapnuta = !(jeHraZapnuta)
})
lightGate.onLightLevelDrop(function () {
    if (jeHraZapnuta) {
        music.playTone(330, music.beat(BeatFraction.Whole))
    }
})
```

Demo  [https://github.com/microbit-cz/pxt-light-gate-demo-hard](https://github.com/microbit-cz/pxt-light-gate-demo-hard)

