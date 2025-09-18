# 📊 Métricas de Calidad en el Proyecto **Beans**

---

## 1. Propósito Educativo  

Esta actividad tiene como objetivo pasar de la **teoría a la práctica**.  

Aplicaréis las métricas y procedimientos de vuestro **Plan de Calidad** para evaluar el proyecto **Beans**, un protocolo de préstamos y ahorros basado en **Soroban en Stellar**.  

Esto permitirá:  

- Identificar, analizar y evaluar las prácticas de control de calidad en un entorno **DeFi real**.  
- Consolidar la comprensión sobre la importancia de la **calidad del software** en proyectos de alto riesgo financiero.  

---

## 2. Estructura de las Actividades y Subactividades del Estudiante  

### 🔹 Fase 1: Selección y Exploración del Proyecto  

#### Subactividad 1.1 - Selección del Proyecto  
- El equipo trabajará en el proyecto **Beans**  [usebeans.xyz](https://usebeans.xyz).  
- Repositorio principal de contratos inteligentes en GitHub:  
  [https://github.com/usebeans/contracts](https://github.com/usebeans/contracts) *(confirmar URL exacta)*  

#### Subactividad 1.2 - Exploración del Repositorio  
Elementos clave de calidad a revisar:  

- **Pruebas**: existencia de test unitarios e integraciones (`test` o `tests`).  
- **Documentación**: claridad del `README.md`, instrucciones de despliegue e interacción, explicación de conceptos económicos (*Tasa de Interés, LTV*). Revisar documentación técnica (comentarios en el código).  
- **Seguridad**: auditorías publicadas o referenciadas. Revisar *Issues* y *Pull Requests* etiquetados como `security` o `critical`.  
- **Configuración y Herramientas**: presencia de archivos como `.soroban/`, `Makefile`, `Cargo.toml`.  

---

### 🔹 Fase 2: Análisis y Aplicación de Métricas  

#### Subactividad 2.1 - Aplicación de Métricas del Plan de Calidad  
Métricas clave para evaluar el proyecto Beans:  

1. **Cobertura de Pruebas**  
   - Porcentaje de funciones críticas cubiertas:  
     `initialize`, `deposit`, `borrow`, `liquidate`.  

2. **Complejidad Ciclomática**  
   - Nivel de complejidad de funciones que manejan fondos.  

3. **Calidad de la Documentación**  
   - ¿Es suficiente para que un desarrollador entienda y audite el código?  
   - ¿Es clara para que un usuario entienda riesgos?  

4. **Tasa de Errores Críticos Resueltos**  
   - ¿Cuántos *bugs* críticos se cerraron?  
   - ¿En cuánto tiempo?  

5. **Indicadores de Seguridad**  
   - Auditoría de seguridad pública por una firma reconocida: **✅ Sí / ❌ No**  

#### Subactividad 2.2 - Análisis Crítico  
No basta con recopilar datos, hay que interpretarlos:  

- Una cobertura del **95%** puede ser engañosa si el 5% sin cubrir incluye la función `liquidate`.  
- Documentación sin explicar penalizaciones por liquidación → **falla de calidad** para el usuario.  
- La ausencia de auditoría de seguridad es una **red flag 🚩** en proyectos DeFi.  

---

### 🔹 Fase 3: Elaboración y Entrega del Informe  

#### Subactividad 3.1 - Redacción del Análisis  
El informe debe contener:  

- Descripción del proyecto **Beans**.  
- Métricas aplicadas y resultados.  
- Análisis crítico de la calidad.  
- Evidencias: capturas del repositorio, resultados de tests, ejemplos de código o issues.  

#### Subactividad 3.2 - Conclusiones y Recomendaciones  
- Resumen de hallazgos clave.  
- Propuestas de mejora basadas en **CMMI** o **MoProSoft**.  

 *Ejemplo de recomendación (CMMI Nivel 4 - Quantitatively Managed):*  

> “Recomendamos que el equipo de Beans implemente un **dashboard de métricas en tiempo real** para monitorear la cobertura de pruebas y la deuda técnica, permitiendo una toma de decisiones cuantitativa para la mejora de procesos.”  

---
