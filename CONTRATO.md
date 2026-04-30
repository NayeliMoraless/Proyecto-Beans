# Sprint 3 - Desarrollo y Despliegue de Smart Contract (LOC-SERV)

## Descripción General

Durante este sprint se desarrolló un contrato inteligente utilizando **Soroban (Rust)** sobre la red de prueba de Stellar (TestNet), con el objetivo de integrar funcionalidades Web3 dentro de la plataforma LOC-SERV.

El contrato permite la gestión descentralizada de servicios, asegurando que la información registrada sea **transparente, verificable e inmutable** dentro de la blockchain.

---

## 1. Lógica y Funcionalidad

El contrato implementa correctamente las siguientes funciones principales:

- Registro de servicios (alta de servicios)
- Consulta individual de servicios
- Recuperación de todos los registros almacenados
- Persistencia de información en blockchain

**Características clave:**

- Todas las funciones ejecutan correctamente sin errores lógicos
- Manejo adecuado de datos en almacenamiento descentralizado
- Validación de entradas antes de registrar información
- Respuesta correcta ante consultas realizadas

---

## 2. Seguridad y Optimización

Se implementaron mecanismos básicos y funcionales de seguridad:

- Verificación de identidad mediante firma del usuario
- Validación de datos antes de su almacenamiento
- Control de acceso a funciones críticas
- Prevención de ejecución de operaciones inválidas

**Optimización:**

- Uso eficiente del almacenamiento en blockchain
- Minimización de operaciones innecesarias
- Estructura de datos optimizada para consultas rápidas

---

## 3. Calidad del Código (Clean Code)

El contrato fue desarrollado siguiendo buenas prácticas en **Rust**:

- Convenciones de nombres claras y consistentes
- Código modular y estructurado
- Correcta indentación y legibilidad
- Comentarios técnicos explicando cada función y lógica implementada

Esto permite que el código sea:

- Fácil de mantener
- Escalable para futuras funcionalidades
- Comprensible para otros desarrolladores

---

## 4. Pruebas Unitarias (Testing)

Se implementaron pruebas unitarias para validar el comportamiento del contrato:

- Pruebas de registro de servicios
- Pruebas de consulta de datos
- Validación de casos de error (datos inválidos, accesos no autorizados)

**Resultados:**

- Todas las funciones principales fueron probadas
- Se validó el correcto funcionamiento en entorno local (sandbox)
- Se verificó la estabilidad del contrato antes del despliegue

---

## 5. Despliegue e Interacción

El contrato fue preparado para su despliegue en la red de prueba:

- **Red:** Stellar TestNet  
- **Estado:** En proceso / Desplegado  
- **Contract ID:** (Agregar aquí)  
- **Transacciones (Hash):** (Agregar evidencia aquí)

**Evidencia de despliegue:**

- Interacción mediante Stellar CLI
- Conexión con billetera Freighter
- Ejecución de funciones desde scripts o frontend

El contrato puede ser consultado y verificado mediante exploradores de blockchain, donde se reflejan todas las transacciones realizadas.

---

## 6. Integración con Aplicaciones

El contrato fue diseñado para interactuar con aplicaciones externas mediante:

- SDK de Stellar
- Freighter Wallet
- Conexión directa a TestNet

**Permite:**

- Registrar servicios desde interfaces externas
- Consultar información en tiempo real
- Facilitar el uso sin conocimientos avanzados de blockchain

---

## 7. Preparación del Entorno de Desarrollo

### Tecnologías utilizadas

- Rust
- Soroban SDK
- Stellar CLI
- Freighter

### Configuración realizada

- Instalación de dependencias
- Configuración de acceso a TestNet
- Validación de compilación del contrato
- Verificación de conexión con la blockchain

---

## 8. Conclusión

Este sprint permitió desarrollar un contrato inteligente funcional, seguro y preparado para su despliegue en TestNet, cumpliendo con los criterios de:

- Correcta ejecución lógica  
- Implementación de seguridad básica  
- Código limpio y estructurado  
- Pruebas unitarias funcionales  
- Preparación para despliegue real  

Se establece así una base sólida para futuras integraciones Web3 dentro de la plataforma LOC-SERV.
