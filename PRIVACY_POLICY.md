# Política de Privacidad de BEANS Wallet

**Última actualización**: Diciembre 2024

## 1. Introducción

BEANS ("nosotros", "nuestro" o "la aplicación") respeta su privacidad y se compromete a proteger sus datos personales. Esta Política de Privacidad explica cómo manejamos su información cuando usa nuestra billetera digital.

## 2. Información que NO Recopilamos

BEANS es una aplicación descentralizada que NO recopila ni almacena:

- ❌ Nombres reales o información de identidad
- ❌ Direcciones de correo electrónico
- ❌ Números de teléfono
- ❌ Direcciones físicas
- ❌ Secret Keys (claves privadas)
- ❌ Historial de navegación
- ❌ Datos de ubicación
- ❌ Información de dispositivo

## 3. Información Almacenada Localmente

La siguiente información se almacena ÚNICAMENTE en su navegador (localStorage):

### 3.1 Public Key de Stellar
- **Qué es**: Su dirección pública en la blockchain de Stellar
- **Por qué**: Para consultar su balance y realizar transacciones
- **Dónde**: Solo en su navegador local
- **Acceso**: Solo usted tiene acceso

### 3.2 Credenciales de Passkey
- **Qué es**: Información de su credencial biométrica
- **Por qué**: Para autenticación rápida y segura
- **Dónde**: Solo en su navegador local
- **Acceso**: Protegido por biometría de su dispositivo

### 3.3 Vinculación Passkey-Cuenta
- **Qué es**: Mapeo entre su passkey y su Public Key
- **Por qué**: Para recuperar su cuenta al autenticarse
- **Dónde**: Solo en su navegador local

## 4. Datos en la Blockchain

### 4.1 Transacciones Públicas
Las transacciones en Stellar son públicas y permanentes:
- Direcciones de origen y destino
- Montos transferidos
- Timestamps de transacciones
- Memos (si se incluyen)

**Importante**: Estos datos son inherentes a la tecnología blockchain y no son controlados por BEANS.

### 4.2 Pseudonimato
- Su Public Key NO está vinculada a su identidad real a menos que usted la revele
- Las transacciones son pseudónimas, no anónimas
- Cualquiera puede ver transacciones en exploradores de blockchain

## 5. Uso de Secret Keys

### 5.1 Manejo Temporal
- Su Secret Key se solicita SOLO cuando firma transacciones
- Se mantiene en memoria SOLO durante la transacción
- Se elimina inmediatamente después de firmar
- NUNCA se envía a ningún servidor
- NUNCA se almacena en localStorage o cookies

### 5.2 Su Responsabilidad
- Usted es el único responsable de guardar su Secret Key
- BEANS no puede recuperar Secret Keys perdidas
- Nadie de BEANS le pedirá su Secret Key

## 6. Comunicación con Servicios Externos

### 6.1 Horizon API (Stellar)
BEANS se comunica con Horizon API de Stellar para:
- Consultar balances de cuentas
- Enviar transacciones firmadas
- Verificar estados de transacciones

**Datos enviados**:
- Public Keys (para consultas)
- Transacciones firmadas (para envíos)

**Datos NO enviados**:
- Secret Keys
- Información personal
- Datos de navegación

### 6.2 HTTPS
Todas las comunicaciones usan HTTPS para proteger datos en tránsito.

## 7. Cookies y Tecnologías Similares

BEANS NO usa:
- Cookies de terceros
- Cookies de seguimiento
- Analytics de terceros
- Publicidad

BEANS SÍ usa:
- localStorage para datos de sesión (solo en su navegador)
- sessionStorage temporal (se borra al cerrar navegador)

## 8. Derechos del Usuario

### 8.1 Control Total
Usted tiene control total sobre sus datos:
- Puede borrar su Public Key de localStorage en cualquier momento
- Puede eliminar credenciales de Passkey
- Puede limpiar todos los datos del navegador

### 8.2 Portabilidad
- Sus datos están en su navegador, no en nuestros servidores
- Puede exportar su Public Key en cualquier momento
- Puede usar su Secret Key en cualquier otra billetera Stellar

## 9. Seguridad

### 9.1 Medidas Implementadas
- HTTPS obligatorio para todas las conexiones
- Validación de entradas para prevenir ataques
- No almacenamiento de Secret Keys
- Autenticación biométrica con WebAuthn

### 9.2 Limitaciones
- La seguridad de su Secret Key depende de usted
- La seguridad de su dispositivo es su responsabilidad
- BEANS no puede proteger contra malware en su dispositivo

## 10. Menores de Edad

BEANS no está dirigido a menores de 18 años. No recopilamos intencionalmente información de menores.

## 11. Cambios a esta Política

Podemos actualizar esta Política de Privacidad ocasionalmente. Los cambios se publicarán en esta página con una nueva fecha de "Última actualización".

## 12. Jurisdicción y Ley Aplicable

Esta Política se rige por las leyes aplicables de protección de datos, incluyendo:
- GDPR (Unión Europea)
- CCPA (California, USA)
- Leyes locales de protección de datos

## 13. Transparencia

### 13.1 Código Abierto
BEANS es código abierto. Puede revisar el código en:
- GitHub: https://github.com/NayeliMoraless/Proyecto-Beans

### 13.2 Auditoría
El código puede ser auditado por cualquiera para verificar nuestras prácticas de privacidad.

## 14. Contacto

Si tiene preguntas sobre esta Política de Privacidad:

- **GitHub Issues**: https://github.com/NayeliMoraless/Proyecto-Beans/issues
- **Discussions**: https://github.com/NayeliMoraless/Proyecto-Beans/discussions

## 15. Resumen Ejecutivo

**Lo que BEANS hace**:
✅ Almacena su Public Key localmente en su navegador
✅ Usa su Secret Key temporalmente para firmar transacciones
✅ Se comunica con Stellar Horizon API
✅ Respeta su privacidad completamente

**Lo que BEANS NO hace**:
❌ No recopila información personal
❌ No almacena Secret Keys
❌ No usa cookies de seguimiento
❌ No comparte datos con terceros
❌ No tiene servidores que almacenen sus datos

---

**Su privacidad es nuestra prioridad. BEANS es una herramienta, no un custodio de sus datos.**
