# 🧭 BUSSOLA mobile

Versione tascabile (PWA) del sistema di controllo commesse: dashboard KPI,
avanzamento consuntivato e dell'ultimo periodo, confronto fra le revisioni di
budget (T1–T4) e l'avanzamento (consuntivato, provvisorio o parziale al 15).

## Come si usa

1. Apri l'app dal telefono e scegli **"Aggiungi alla schermata Home"** per
   installarla.
2. Dalla pagina **Dati** carica il file `bussola_dati.json` generato dal
   sistema BUSSOLA (script `esporta_dati_app.py` o pagina dedicata).
3. I dati restano **solo sul dispositivo** (localStorage): l'app non li invia
   da nessuna parte.

## Modalità server

Se accanto all'app è presente un file `bussola_dati.json` (per esempio quando
l'app è servita dal server aziendale), viene caricato automaticamente
all'avvio e tenuto aggiornato.

## Privacy

Questo repository contiene **solo il guscio dell'applicazione**: nessun dato
aziendale è presente nel codice. Il pulsante "Dati demo" genera numeri casuali
di fantasia a solo scopo dimostrativo.
