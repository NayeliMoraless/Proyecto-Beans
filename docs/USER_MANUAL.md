# Manual de Usuario - BEANS Wallet

## Bienvenido a BEANS 🌱

BEANS es tu billetera digital simple y global para realizar pagos internacionales usando la blockchain de Stellar.

## Tabla de Contenidos

1. [Primeros Pasos](#primeros-pasos)
2. [Crear tu Cuenta](#crear-tu-cuenta)
3. [Iniciar Sesión](#iniciar-sesión)
4. [Ver tu Balance](#ver-tu-balance)
5. [Enviar Dinero](#enviar-dinero)
6. [Recibir Dinero](#recibir-dinero)
7. [Seguridad](#seguridad)
8. [Preguntas Frecuentes](#preguntas-frecuentes)

## Primeros Pasos

### ¿Qué necesitas?

- Un navegador moderno (Chrome, Edge, Safari o Firefox)
- Conexión a internet
- Un dispositivo con sensor biométrico (opcional, para Passkey)

### Acceder a BEANS

1. Abre tu navegador
2. Ve a la dirección de BEANS
3. Verás la pantalla de bienvenida

## Crear tu Cuenta

### Paso 1: Generar tu Cuenta Stellar

1. Ve a [Stellar Laboratory](https://laboratory.stellar.org/#account-creator?network=test)
2. Click en "Generate keypair"
3. **Guarda tu información de forma segura:**
   - **Public Key** (empieza con G): Es como tu número de cuenta, puedes compartirla
   - **Secret Key** (empieza con S): Es como tu contraseña, NUNCA la compartas

### Paso 2: Fondear tu Cuenta

1. En Stellar Laboratory, copia tu Public Key
2. Click en "Fund account with Friendbot"
3. Espera unos segundos
4. ¡Tu cuenta ahora tiene 10,000 XLM de prueba!

## Iniciar Sesión

BEANS ofrece dos formas de iniciar sesión:

### Opción 1: Con Passkey (Recomendado) 🔐

**Primera vez - Registro:**

1. Click en "Registrar Passkey"
2. Ingresa un nombre de usuario (ej: "mi_wallet")
3. Pega tu Public Key de Stellar
4. Click en "Registrar Passkey"
5. Sigue las instrucciones de tu dispositivo:
   - **En móvil**: Usa tu huella digital o Face ID
   - **En computadora**: Usa Windows Hello o Touch ID

**Siguientes veces:**

1. Click en "Iniciar con Passkey"
2. Autentica con tu biometría
3. ¡Listo!

### Opción 2: Con Clave Pública 🔑

1. Click en "Usar Clave Pública"
2. Pega tu Public Key (la que empieza con G)
3. Click en "Conectar Billetera"

## Ver tu Balance

Una vez que inicies sesión:

1. Verás tu balance principal en la tarjeta verde
2. El balance se muestra en XLM (Stellar Lumens)

### Acciones disponibles:

- **🔄 Actualizar**: Click para refrescar tu balance
- **👁️ Ocultar/Mostrar**: Click para ocultar o mostrar el monto
- **🚪 Cerrar Sesión**: Click para salir de tu cuenta

## Enviar Dinero

### Paso 1: Ir a Enviar

1. Click en el ícono "Enviar" en la barra inferior
2. Verás el formulario de envío

### Paso 2: Ingresar Datos

1. **Destinatario**: Pega la Public Key de la persona que recibirá el dinero
   - Debe empezar con "G"
   - Tiene 56 caracteres
   
2. **Monto**: Ingresa cuánto XLM quieres enviar
   - Verifica que tengas suficiente saldo
   - Recuerda dejar al menos 1 XLM en tu cuenta

3. Click en "Continuar"

### Paso 3: Confirmar con tu Secret Key

1. Aparecerá un campo para tu Secret Key
2. Pega tu Secret Key (la que empieza con S)
3. Click en "Confirmar Envío"

### Paso 4: Confirmación

- Verás un mensaje de éxito con el hash de la transacción
- Tu balance se actualizará automáticamente
- El formulario se limpiará para una nueva transacción

### ⚠️ Importante sobre la Secret Key

- Tu Secret Key **NUNCA** se guarda en BEANS
- Solo se usa para firmar esta transacción específica
- Se borra de la memoria inmediatamente después
- Nadie más puede ver tu Secret Key

## Recibir Dinero

Para recibir dinero es muy simple:

1. Ve a tu página principal
2. Copia tu Public Key
3. Compártela con la persona que te enviará dinero
4. Espera a que realice la transacción
5. Click en 🔄 para actualizar tu balance

**Nota**: Tu Public Key es segura para compartir, es como tu número de cuenta bancaria.

## Seguridad

### Protege tu Secret Key

✅ **SÍ hacer:**
- Guárdala en un lugar seguro (papel, gestor de contraseñas)
- Haz una copia de respaldo
- Mantenla privada

❌ **NO hacer:**
- Compartirla con nadie
- Enviarla por email o mensajes
- Guardarla en archivos sin cifrar
- Tomarle foto con tu teléfono

### Usa Passkey cuando sea posible

- Más seguro que escribir claves manualmente
- Más rápido para iniciar sesión
- Protegido por biometría de tu dispositivo

### Verifica las direcciones

- Siempre verifica la dirección del destinatario
- Un error en la dirección puede resultar en pérdida de fondos
- Las transacciones en blockchain son irreversibles

## Preguntas Frecuentes

### ¿Qué es XLM?

XLM (Stellar Lumens) es la criptomoneda nativa de la red Stellar. Se usa para pagar tarifas de transacción y como puente entre diferentes monedas.

### ¿Por qué necesito HTTPS?

HTTPS es necesario para que funcione la autenticación con Passkey (WebAuthn). Es un estándar de seguridad del navegador.

### ¿Puedo usar BEANS en mi teléfono?

Sí, BEANS es responsive y funciona en dispositivos móviles. La autenticación con Passkey funciona especialmente bien en móviles con huella digital o Face ID.

### ¿Qué pasa si pierdo mi Secret Key?

Si pierdes tu Secret Key, no podrás enviar transacciones desde esa cuenta. Es muy importante hacer una copia de respaldo segura.

### ¿Cuánto cuesta enviar XLM?

Las transacciones en Stellar tienen una tarifa mínima de 0.00001 XLM (muy económico). BEANS no cobra tarifas adicionales.

### ¿Por qué debo dejar 1 XLM en mi cuenta?

Stellar requiere un balance mínimo de 1 XLM para mantener la cuenta activa. Si el balance baja de 1 XLM, la cuenta podría ser eliminada.

### ¿Mis transacciones son privadas?

Las transacciones en blockchain son públicas y pueden verse en exploradores de bloques. Sin embargo, tu identidad personal no está vinculada a tu Public Key a menos que tú la reveles.

### ¿Puedo cancelar una transacción?

No, las transacciones en blockchain son irreversibles una vez confirmadas. Por eso es importante verificar bien los datos antes de enviar.

### ¿Qué hago si veo un error?

1. Lee el mensaje de error
2. Verifica tu conexión a internet
3. Asegúrate de tener saldo suficiente
4. Verifica que la dirección del destinatario sea correcta
5. Si el problema persiste, reporta el issue en GitHub

### ¿BEANS guarda mi dinero?

No, BEANS es una interfaz (wallet) para interactuar con la blockchain de Stellar. Tus fondos están en la blockchain, no en BEANS. Tú tienes el control total con tu Secret Key.

## Soporte

Si necesitas ayuda:

- **GitHub Issues**: [Reportar Problema](https://github.com/NayeliMoraless/Proyecto-Beans/issues)
- **Documentación**: Lee el README y otros documentos
- **Comunidad Stellar**: [Stellar Discord](https://discord.gg/stellar)

---

**¡Disfruta usando BEANS! 🌱**
