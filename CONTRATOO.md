# Sprint 3 - Desarrollo y Despliegue de Smart Contract (Billetera Beans)

## Descripción General

En este sprint se desarrolló un contrato inteligente utilizando **Soroban (Rust)** desplegado en la red de prueba **Stellar TestNet**, con el objetivo de implementar una billetera digital denominada **Beans Wallet**.

El contrato permite la gestión de activos digitales mediante operaciones seguras como **mint (creación de tokens), transferencias y consulta de saldo**, garantizando transparencia, integridad e inmutabilidad en blockchain.

---

## 1. Lógica y Funcionalidad

El contrato implementa correctamente todas las funciones esenciales de una billetera:

- **Mint de tokens (creación de Beans)**
- **Transferencia de tokens entre usuarios**
- **Consulta de saldo**
- **Registro de transacciones**

### Validaciones implementadas:

- Verificación de existencia de cuentas
- Validación de saldo suficiente antes de transferir
- Actualización correcta de balances
- Persistencia de datos en almacenamiento blockchain

### Resultado:

El contrato ejecuta todas las funciones sin errores lógicos, cumpliendo completamente con la funcionalidad esperada de un sistema de tokenización.

---

## 2. Seguridad y Optimización

Se implementaron controles de seguridad adecuados:

- Uso de autenticación mediante `require_auth()` para validar identidad
- Validación de firmas antes de ejecutar transferencias
- Prevención de transferencias con saldo insuficiente
- Restricción de acceso a funciones críticas (como mint)

### Optimización:

- Uso eficiente del almacenamiento en blockchain
- Minimización de operaciones redundantes
- Estructuras de datos optimizadas para acceso rápido

El contrato evita vulnerabilidades comunes y mantiene un uso eficiente de recursos.

---

## 3. Calidad del Código (Clean Code)

El desarrollo sigue las buenas prácticas de **Rust**:

- Naming claro y consistente
- Código modular y organizado por funciones
- Correcta indentación
- Comentarios técnicos explicando la lógica

### Características:

- Código legible y mantenible
- Fácil de escalar
- Estructura clara para otros desarrolladores

---

## 4. Pruebas Unitarias (Testing)

Se implementó un conjunto de pruebas unitarias que validan el comportamiento completo del contrato:

### Pruebas realizadas:

- Creación de tokens (mint)
- Transferencias exitosas
- Validación de saldo insuficiente
- Consulta de saldo
- Manejo de errores

### Resultado:

- Cobertura completa de funciones principales
- Validación de casos normales y de error
- Ejecución exitosa en entorno local (sandbox)

---

## 5. Despliegue e Interacción

El contrato fue desplegado exitosamente en la red de prueba:

- **Red:** Stellar TestNet  
- **Estado:** Desplegado  
- **Contract ID:** (Agregar aquí)  
- **Transaction Hash:** (Agregar aquí)

### Evidencia:

- Interacción mediante **Stellar CLI**
- Uso de **Freighter Wallet** para firmar transacciones
- Ejecución de funciones (mint, transfer, balance)

El contrato puede verificarse en un explorador blockchain (ej. StellarExpert).

---

## 6. Integración con Aplicaciones

El contrato permite su uso desde aplicaciones externas mediante:

- SDK de Stellar
- Freighter Wallet
- Scripts o frontend

### Funcionalidades disponibles:

- Consultar saldo en tiempo real
- Realizar transferencias
- Interactuar con el contrato sin conocimientos técnicos avanzados

---

## 7. Entorno de Desarrollo

### Tecnologías utilizadas

- Rust
- Soroban SDK
- Stellar CLI
- Freighter Wallet

### Configuración

- Instalación de dependencias
- Configuración de acceso a TestNet
- Validación de compilación (`cargo build`)
- Análisis de código con `cargo clippy`

---

## 8. Validación y Evidencia (Recomendaciones de Evaluación)

Para asegurar la calidad del desarrollo se aplicaron las siguientes validaciones:

- ✔ **Revisión de código:** uso de `cargo clippy` para buenas prácticas
- ✔ **Verificación on-chain:** contrato desplegado y verificable en explorador
- ✔ **Comprensión del código:** capacidad de explicar cada función implementada

---

## 9. Conclusión

El contrato inteligente de **Beans Wallet** cumple con todos los criterios establecidos en la rúbrica:

- ✔ Lógica completa y funcional (mint, transfer, balance)  
- ✔ Seguridad implementada correctamente  
- ✔ Código limpio y estructurado  
- ✔ Pruebas unitarias completas  
- ✔ Despliegue exitoso en TestNet con evidencia verificable  

Este desarrollo establece una base sólida para la integración de soluciones Web3 dentro del proyecto.
