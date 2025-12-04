# BEANS - Tu billetera simple y global 🌱

![BEANS Logo](https://img.shields.io/badge/BEANS-Wallet-green)
![Stellar](https://img.shields.io/badge/Stellar-Testnet-blue)
![License](https://img.shields.io/badge/license-MIT-green)

**BEANS** es una billetera digital construida sobre la blockchain de Stellar, diseñada para facilitar pagos transfronterizos y promover la inclusión financiera global.

## 🌟 Características

- ✅ **Autenticación Biométrica**: Login con Passkey (WebAuthn) usando huella digital o reconocimiento facial
- ✅ **Transacciones Stellar**: Envío y recepción de XLM en la red Testnet
- ✅ **Seguridad**: Manejo seguro de claves privadas sin almacenamiento en servidor
- ✅ **Interfaz Intuitiva**: Diseño moderno y fácil de usar
- ✅ **Balance en Tiempo Real**: Consulta instantánea de saldos
- ✅ **Validación Completa**: Verificación de direcciones, montos y transacciones

## 🚀 Inicio Rápido

### Prerrequisitos

- Node.js 18+ 
- npm o yarn
- Navegador moderno (Chrome, Edge, Safari, Firefox)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/NayeliMoraless/Proyecto-Beans.git
cd Proyecto-Beans

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `https://localhost:5174`

### Configuración

1. **Certificado HTTPS**: La aplicación usa HTTPS para WebAuthn. Al abrir por primera vez, acepta el certificado autofirmado.

2. **Cuenta Stellar Testnet**: 
   - Ve a [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)
   - Genera un nuevo keypair
   - Guarda tu Public Key (G...) y Secret Key (S...)
   - Fondea tu cuenta con Friendbot

## 📖 Guía de Uso

### 1. Iniciar Sesión

**Opción A - Con Passkey (Recomendado)**
1. Click en "Registrar Passkey"
2. Ingresa un nombre de usuario
3. Ingresa tu Stellar Public Key
4. Sigue el prompt biométrico de tu dispositivo

**Opción B - Con Clave Pública**
1. Click en "Usar Clave Pública"
2. Ingresa tu Stellar Public Key (G...)
3. Click en "Conectar Billetera"

### 2. Ver Balance

- Tu balance se muestra automáticamente en la página principal
- Click en 🔄 para actualizar
- Click en 👁️ para ocultar/mostrar el saldo

### 3. Enviar XLM

1. Ve a la sección "Enviar"
2. Ingresa la dirección del destinatario (G...)
3. Ingresa el monto en XLM
4. Click en "Continuar"
5. Ingresa tu Secret Key (S...)
6. Click en "Confirmar Envío"

### 4. Cerrar Sesión

- Click en el ícono 🚪 en la tarjeta de balance
- Serás redirigido a la pantalla de login

## 🏗️ Arquitectura

```
BEANS Wallet
│
├── Frontend (React + Vite)
│   ├── Autenticación (Passkey + Public Key)
│   ├── Gestión de Balance
│   ├── Envío de Transacciones
│   └── Interfaz de Usuario
│
├── Servicios
│   ├── Stellar SDK
│   │   ├── Horizon API (Testnet)
│   │   ├── Construcción de Transacciones
│   │   └── Firma y Envío
│   │
│   └── WebAuthn (Passkey)
│       ├── Registro de Credenciales
│       └── Autenticación Biométrica
│
└── Seguridad
    ├── HTTPS (Certificado SSL)
    ├── Validación de Entradas
    └── Manejo Seguro de Claves
```

## 🔒 Seguridad

### Manejo de Claves Privadas

- **Nunca almacenadas**: Las Secret Keys solo se solicitan cuando son necesarias para firmar transacciones
- **Solo en memoria**: Se mantienen temporalmente en memoria durante la transacción
- **Sin persistencia**: No se guardan en localStorage, sessionStorage ni servidor

### Validaciones

- ✅ Validación de formato de Public Keys (Ed25519)
- ✅ Validación de formato de Secret Keys
- ✅ Verificación de montos y saldos
- ✅ Validación de direcciones de destino
- ✅ Manejo de errores de Horizon API

## 📚 Tecnologías

- **Frontend**: React 19, Vite, TailwindCSS
- **Blockchain**: Stellar SDK, Horizon API (Testnet)
- **Autenticación**: WebAuthn API, SimpleWebAuthn
- **Routing**: React Router DOM
- **Iconos**: Lucide React
- **Animaciones**: Framer Motion

## 🌐 Integración con Stellar

### Horizon API

BEANS se conecta a Horizon Testnet para:
- Consultar balances de cuentas
- Enviar transacciones
- Verificar estados de transacciones

### Transacciones

Las transacciones se construyen usando:
- `TransactionBuilder` para crear operaciones
- `Operation.payment` para transferencias XLM
- Firma con keypair del usuario
- Envío a través de `server.submitTransaction()`

### Manejo de Errores

Errores comunes manejados:
- `tx_insufficient_balance`: Saldo insuficiente
- `tx_bad_seq`: Error de secuencia
- `op_no_destination`: Cuenta de destino no existe

## 🤝 Contribución a la Inclusión Financiera

BEANS está alineado con la misión de Stellar Community Fund (SCF) de promover:

1. **Accesibilidad**: Interfaz simple para usuarios no técnicos
2. **Pagos Transfronterizos**: Transferencias rápidas y económicas
3. **Inclusión Financiera**: Acceso a servicios financieros sin barreras
4. **Código Abierto**: Transparencia y auditoría pública
5. **Seguridad**: Protección de fondos y datos de usuarios

## 📄 Documentación Adicional

- [Manual de Usuario](./docs/USER_MANUAL.md)
- [Guía de Arquitectura](./docs/ARCHITECTURE.md)
- [Política de Privacidad](./PRIVACY_POLICY.md)
- [Términos de Servicio](./TERMS_OF_SERVICE.md)
- [Lista de Verificación de Auditoría](./LISTA%20DE%20VERIFICACION.md)

## 🐛 Reporte de Problemas

Si encuentras algún problema, por favor:
1. Verifica que no esté ya reportado en [Issues](https://github.com/NayeliMoraless/Proyecto-Beans/issues)
2. Crea un nuevo issue con detalles completos
3. Incluye pasos para reproducir el problema

## 📞 Soporte y Comunidad

- **GitHub**: [Proyecto BEANS](https://github.com/NayeliMoraless/Proyecto-Beans)
- **Issues**: [Reportar Problemas](https://github.com/NayeliMoraless/Proyecto-Beans/issues)
- **Discussions**: [Comunidad](https://github.com/NayeliMoraless/Proyecto-Beans/discussions)

## 📜 Licencia

Este proyecto está licenciado bajo la Licencia MIT. Ver el archivo [LICENSE](./LICENSE) para más detalles.

## 🙏 Agradecimientos

- **Stellar Development Foundation** por la infraestructura blockchain
- **Stellar Community Fund** por el apoyo al ecosistema
- Comunidad de desarrolladores de Stellar

---

**Hecho con ❤️ para la comunidad Stellar**
