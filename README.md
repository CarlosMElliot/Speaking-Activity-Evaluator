<div align="center">

# 👑 Speaking Activity Evaluator

**An elegant, high-efficiency evaluation engine & professional feedback generator for educators.**

![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)
![License](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)

<p align="center">
  <a href="#-key-features">Key Features</a> •
  <a href="#-rubric-breakdown">Rubric Breakdown</a> •
  <a href="#-project-architecture">Architecture</a> •
  <a href="#-quick-start">Quick Start</a> •
  <a href="#-email-engine">Email Engine</a>
</p>

---

</div>

## 📌 Overview

The **Speaking Activity Evaluator** is a streamlined, web-based assessment suite designed for ESL/EFL instructors. It replaces manual grading friction with real-time score auto-calculation and builds polished, responsive HTML emails ready for direct deployment into **Microsoft Outlook** or **Gmail**.

---

## ✨ Key Features

* **⚡ Interactive Scoring Grid**: One-click score selection across all assessment criteria.
* **🧮 Dynamic Grade Aggregation**: Instant real-time score summation out of **100 points**.
* **📬 Rich HTML Email Builder**: Generates centered, responsive, email-client-ready feedback cards.
* **🎯 Automated Performance Segmentation**: Dynamically sorts feedback into **Strengths** and **Key Focus Areas**.
* **📋 Rich-Text Clipboard Direct-Paste**: Utilizes the modern Async Clipboard API to preserve full table styles and color highlights when pasting into mail clients.

---

## 📊 Rubric Breakdown

| Criterion | Max Score | Core Focus |
| :--- | :---: | :--- |
| **Modal Verbs Usage** | `30 pts` | Accurate deployment of target modal structures across spoken instances. |
| **Dependent Prepositions** | `20 pts` | Correct verb + preposition pairings. |
| **Content & Examples** | `20 pts` | Depth of personal learning strategies and specific supporting details. |
| **Delivery & Naturalness** | `15 pts` | Speech fluidity, eye contact, and independence from written scripts. |
| **Clarity & Pronunciation** | `10 pts` | Articulation, pacing, and overall listener effort required. |
| **Time Management** | `5 pts` | Target duration compliance (**5:30 – 6:30 min** gold standard). |

---

## 🏗️ Project Architecture

```text
├── index.html   # Main application shell & interactive UI elements
├── style.css    # Modern UI themes, layout styling, and custom variables
└── script.js    # State management, score calculation, and HTML email compiler