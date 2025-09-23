## BEANS  
Lista de Verificación de Auditoría para el Proyecto **"Beans – Tu billetera simple y global"**  

## Propósito  
Este documento sirve como guía para auditar el código, la documentación y la alineación del proyecto con los principios de Stellar, asegurando que cumple con estándares de calidad, seguridad y usabilidad para ser considerado dentro del ecosistema y confiable para la comunidad y el comité de la SCF.  

## Estado de la Auditoría  
- [ ] En Progreso  
- [ ] Completado  
- [ ] Aprobado por el Revisor: 

---

## Sección 1: Auditoría de Código y Seguridad en la Red Stellar  

| ID   | Criterio de Verificación | Descripción | Estado |
|------|--------------------------|-------------|--------|
| C-1.1 | Manejo de Transacciones y Firmas | ¿Se validó que las transacciones estén construidas y firmadas correctamente, evitando fallos en escenarios de multifirma? | [ ] Pendiente |
| C-1.2 | Validación de Entradas (UX y API) | ¿Se validan direcciones de billetera, montos y memos tanto en frontend como en backend? | [ ] Pendiente |
| C-1.3 | Uso de Claves Privadas | ¿El manejo de claves privadas es seguro y nunca se almacenan en el servidor? | [ ] Pendiente |
| C-1.4 | Gestión de Cuentas y Trustlines | ¿Se maneja correctamente la creación de cuentas, trustlines y tarifas de transacción? | [ ] Pendiente |
| C-1.5 | Integración con Soroban | ¿Los contratos inteligentes están validados en sus llamadas, datos y eventos en la cadena? | [ ] Pendiente |
| C-1.6 | Gestión de Errores con Horizon API | ¿Se han implementado mensajes claros ante fallos en la API de Horizon? | [ ] Pendiente |  

---

## Sección 2: Auditoría de Documentación y Usabilidad  

| ID   | Criterio de Verificación | Descripción | Estado |
|------|--------------------------|-------------|--------|
| D-2.1 | Guía de Configuración Completa | ¿Existe documentación clara para instalar, configurar y ejecutar el proyecto? | [ ] Pendiente |
| D-2.2 | Diagramas de Arquitectura | ¿Se incluye un diagrama de alto nivel de la app y su interacción con Stellar? | [ ] Pendiente |
| D-2.3 | Documentación de la API (SEP) | ¿Se documenta el uso de SEPs aplicados (ej. SEP-24)? | [ ] Pendiente |
| D-2.4 | Manual de Usuario | ¿Existe un manual simple para usuarios no técnicos sobre el uso de la billetera? | [ ] Pendiente |  

---

## Sección 3: Cumplimiento y Ecosistema de la SCF  

| ID   | Criterio de Verificación | Descripción | Estado |
|------|--------------------------|-------------|--------|
| E-3.1 | Licencia de Código Abierto | ¿El proyecto incluye una licencia (ej. MIT/Apache 2.0) para auditoría pública? | [ ] Pendiente |
| E-3.2 | Política de Privacidad y Términos de Servicio | ¿Existen documentos publicados para el manejo de datos personales? | [ ] Pendiente |
| E-3.3 | Canales de Comunicación | ¿Se especifican canales claros (Discord, Telegram, GitHub) para soporte? | [ ] Pendiente |
| E-3.4 | Alineación con la SCF | ¿Se destaca cómo la solución contribuye a inclusión financiera y pagos transfronterizos? | [ ] Pendiente |  

---

## Proceso de Verificación  
1. El equipo marca cada criterio como **Completado**.  
2. Un revisor interno/externo valida el cumplimiento de cada punto.  
3. La auditoría solo se considera **Aprobada** cuando el revisor confirma que todos los criterios están cumplidos satisfactoriamente.  

