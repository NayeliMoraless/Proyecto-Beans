# Arquitectura de BEANS Wallet

## Visión General

BEANS es una aplicación web progresiva (PWA) construida con React que interactúa con la blockchain de Stellar para proporcionar servicios de billetera digital.

## Diagrama de Arquitectura de Alto Nivel

```
┌─────────────────────────────────────────────────────────────┐
│                        USUARIO                               │
│                    (Navegador Web)                           │
└────────────────────────┬────────────────────────────────────┘
                         │
                         │ HTTPS
                         │
┌────────────────────────▼────────────────────────────────────┐
│                   BEANS FRONTEND                             │
│                  (React + Vite)                              │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    Login     │  │     Home     │  │     Send     │     │
│  │   (Passkey/  │  │   (Balance)  │  │ (Transactions)│     │
│  │   PublicKey) │  │              │  │              │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Context (WalletContext)                      │  │
│  │  - Estado global de autenticación                    │  │
│  │  - Balance                                            │  │
│  │  - Public Key                                         │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                              │
│  ┌──────────────────────────────────────────────────────┐  │
│  │          Servicios                                    │  │
│  │  ┌────────────────┐    ┌────────────────┐           │  │
│  │  │  stellar.js    │    │   passkey.js   │           │  │
│  │  │  - checkBalance│    │  - register    │           │  │
│  │  │  - sendPayment │    │  - authenticate│           │  │
│  │  └────────────────┘    └────────────────┘           │  │
│  └──────────────────────────────────────────────────────┘  │
└────────────────────────┬────────────────────────────────────┘
                         │
         ┌───────────────┼───────────────┐
         │               │               │
         ▼               ▼               ▼
┌────────────────┐ ┌──────────────┐ ┌──────────────┐
│  Stellar SDK   │ │ WebAuthn API │ │ LocalStorage │
│                │ │              │ │              │
│ - Keypair      │ │ - Passkey    │ │ - Public Key │
│ - Transaction  │ │   Creation   │ │ - Passkey    │
│   Builder      │ │ - Biometric  │ │   Mapping    │
│ - Operations   │ │   Auth       │ │              │
└────────┬───────┘ └──────────────┘ └──────────────┘
         │
         │ HTTP/HTTPS
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│              Stellar Horizon API (Testnet)                   │
│                                                              │
│  - Account Information                                       │
│  - Balance Queries                                           │
│  - Transaction Submission                                    │
│  - Transaction History                                       │
└────────────────────────┬────────────────────────────────────┘
                         │
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                 Stellar Blockchain (Testnet)                 │
│                                                              │
│  - Distributed Ledger                                        │
│  - Consensus Protocol                                        │
│  - Account States                                            │
│  - Transaction Records                                       │
└─────────────────────────────────────────────────────────────┘
```

## Componentes Principales

### 1. Frontend (React)

#### Páginas

**Login.jsx**
- Maneja autenticación con Passkey o Public Key
- Valida formato de claves
- Redirige a Home después de login exitoso

**Home.jsx**
- Muestra balance actual
- Lista de transacciones recientes
- Acceso rápido a funciones principales

**Send.jsx**
- Formulario para enviar XLM
- Validación de destinatario y monto
- Solicitud de Secret Key para firma
- Confirmación de transacción

**Savings.jsx**
- Vista de ahorros (futuro)
- Información de APY

#### Componentes

**Layout.jsx**
- Estructura general de la aplicación
- Header con logo
- Navegación inferior (Home, Send, Savings)

**WalletCard.jsx**
- Muestra balance principal
- Botones de actualizar, ocultar/mostrar, logout
- Diseño visual atractivo

**TransactionList.jsx**
- Lista de transacciones recientes
- Iconos según tipo de transacción
- Formato de fechas y montos

### 2. Servicios

#### stellar.js

```javascript
// Funciones principales:
- checkBalance(publicKey): Consulta balance de una cuenta
- sendPayment(secretKey, destination, amount): Envía XLM
```

**Flujo de checkBalance:**
1. Conecta a Horizon Testnet
2. Carga información de la cuenta
3. Filtra balance de XLM nativo
4. Retorna balance como string

**Flujo de sendPayment:**
1. Crea keypair desde Secret Key
2. Carga cuenta origen
3. Construye transacción con TransactionBuilder
4. Agrega operación de pago
5. Firma con keypair
6. Envía a Horizon
7. Retorna hash de transacción

#### passkey.js

```javascript
// Funciones principales:
- isPasskeyAvailable(): Verifica soporte de WebAuthn
- registerPasskey(username): Registra nueva credencial
- authenticatePasskey(): Autentica con credencial existente
- hasPasskey(): Verifica si existe passkey registrado
```

**Flujo de registerPasskey:**
1. Genera challenge aleatorio
2. Configura opciones de registro
3. Llama a navigator.credentials.create()
4. Guarda credencial en localStorage
5. Vincula con Public Key de Stellar

**Flujo de authenticatePasskey:**
1. Recupera credencial guardada
2. Genera nuevo challenge
3. Llama a navigator.credentials.get()
4. Verifica firma
5. Retorna información de usuario

### 3. Context (Estado Global)

**WalletContext.jsx**

```javascript
Estado:
- publicKey: Clave pública del usuario
- balance: Balance actual en XLM
- loading: Estado de carga
- error: Mensajes de error
- hasPasskey: Indica si hay passkey registrado

Métodos:
- login(key): Login con Public Key
- loginWithPasskey(): Login con Passkey
- registerPasskeyForUser(username, publicKey): Registra Passkey
- logout(): Cierra sesión
- fetchBalance(): Actualiza balance
```

## Flujos de Datos

### Flujo de Autenticación con Public Key

```
Usuario ingresa Public Key
    ↓
Login.jsx valida formato
    ↓
WalletContext.login(publicKey)
    ↓
Guarda en localStorage
    ↓
fetchBalance() consulta Horizon
    ↓
Actualiza estado con balance
    ↓
Redirige a Home
```

### Flujo de Autenticación con Passkey

```
Usuario click "Iniciar con Passkey"
    ↓
passkey.authenticatePasskey()
    ↓
WebAuthn solicita biometría
    ↓
Usuario autentica
    ↓
Recupera Public Key vinculado
    ↓
WalletContext.login(publicKey)
    ↓
fetchBalance() consulta Horizon
    ↓
Redirige a Home
```

### Flujo de Envío de Transacción

```
Usuario ingresa destinatario y monto
    ↓
Send.jsx valida datos
    ↓
Usuario click "Continuar"
    ↓
Muestra campo de Secret Key
    ↓
Usuario ingresa Secret Key
    ↓
Send.jsx valida Secret Key
    ↓
stellar.sendPayment(secret, dest, amount)
    ↓
Stellar SDK construye transacción
    ↓
Firma con keypair
    ↓
Envía a Horizon API
    ↓
Horizon valida y procesa
    ↓
Retorna hash de transacción
    ↓
Actualiza balance
    ↓
Muestra confirmación
```

## Seguridad

### Manejo de Claves

**Public Key:**
- Almacenada en localStorage
- Usada para consultas de balance
- Segura para compartir

**Secret Key:**
- NUNCA almacenada
- Solo en memoria durante transacción
- Se solicita cada vez que se necesita
- Se limpia inmediatamente después de usar

**Passkey:**
- Credencial almacenada en localStorage
- Vinculada a Public Key
- Protegida por biometría del dispositivo

### Validaciones

1. **Formato de Claves:**
   - Public Key: Ed25519, empieza con G, 56 caracteres
   - Secret Key: Ed25519, empieza con S, 56 caracteres

2. **Montos:**
   - Mayor que 0
   - No excede balance disponible
   - Formato numérico válido

3. **Direcciones:**
   - Formato válido de Public Key
   - Verificación de checksum

### HTTPS

- Requerido para WebAuthn
- Certificado SSL en desarrollo
- Protege comunicación con Horizon

## Integración con Stellar

### Horizon API Endpoints Usados

```
GET /accounts/{account_id}
- Consulta información de cuenta
- Obtiene balances

POST /transactions
- Envía transacciones firmadas
- Retorna resultado de ejecución
```

### Construcción de Transacciones

```javascript
const transaction = new TransactionBuilder(sourceAccount, {
  fee: await server.fetchBaseFee(),
  networkPassphrase: Networks.TESTNET,
})
  .addOperation(
    Operation.payment({
      destination: destinationPublic,
      asset: Asset.native(),
      amount: amount.toString(),
    })
  )
  .setTimeout(30)
  .build();
```

### Firma de Transacciones

```javascript
const sourceKeypair = Keypair.fromSecret(sourceSecret);
transaction.sign(sourceKeypair);
```

## Tecnologías y Dependencias

### Core
- React 19.2.0
- Vite 7.2.4
- React Router DOM 7.9.6

### Stellar
- @stellar/stellar-sdk 14.3.3

### Autenticación
- @simplewebauthn/browser 13.2.2

### UI/UX
- TailwindCSS 3.4.17
- Lucide React 0.555.0
- Framer Motion 12.23.24

### Desarrollo
- @vitejs/plugin-basic-ssl 2.1.0
- vite-plugin-node-polyfills 0.24.0

## Escalabilidad y Futuras Mejoras

### Corto Plazo
1. Soporte para múltiples assets (USDC, etc.)
2. Historial completo de transacciones
3. Implementación de Savings con rendimiento

### Mediano Plazo
1. Integración con Soroban (contratos inteligentes)
2. Soporte para multifirma
3. Integración con SEP-24 (anchor deposits)

### Largo Plazo
1. Aplicación móvil nativa
2. Soporte para Path Payments
3. DEX integration

## Monitoreo y Logs

Actualmente se usa console.log para desarrollo. Para producción se recomienda:
- Sentry para error tracking
- Analytics para uso de features
- Horizon transaction monitoring

---

**Última actualización**: Diciembre 2024
