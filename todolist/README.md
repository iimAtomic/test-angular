# Todolist

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.15.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.



# Partie 1 : Fondamentaux et Architecture DDD

## 🎯 Objectifs de la partie 1

À la fin de cette partie, vous serez capable de :
- ✅ Créer un projet Angular 20+
- ✅ Comprendre l'architecture DDD
- ✅ Créer des composants et utiliser le data binding
- ✅ Utiliser les directives structurelles modernes (`@if`, `@for`)
- ✅ Implémenter les pipes built-in
- ✅ Mettre en place le routing de base
- ✅ Utiliser les services et simuler des appels API

---

## 🚀 Étape 1 : Création du projet Angular

### **Prérequis**

#### **1. Vérifier/Installer Node.js**
```bash
# Vérifier si Node.js est installé
node --version
npm --version

# Si pas installé, télécharger depuis : https://nodejs.org/
# Ou installer via Homebrew (macOS)
brew install node

# Ou installer via Chocolatey (Windows)
choco install nodejs

# Version requise : Node.js 20+ pour Angular 20+
```

#### **2. Mettre à jour npm (optionnel mais recommandé)**
```bash
# Mettre à jour npm vers la dernière version
npm install -g npm@latest

# Vérifier la version
npm --version
```

#### **3. Autres prérequis**
- Git installé
- Compte GitHub créé

### **Création du projet**
```bash
# Installer Angular CLI globalement
npm install -g @angular/cli

# Créer le projet TodoList
ng new todo-list-app

# Réponses aux questions :
# - Would you like to add Angular routing? → Yes
# - Which stylesheet format would you like to use? → CSS (ou votre préférence)
# - Do you want to create a 'zoneless' application without zone.js (Developer Preview)? → No
# - Do you want to enable Server-Side Rendering (SSR) and Static Site Generation (SSG/Prerendering)? → No
```

### **Structure du projet créé**
```
todo-list-app/
├── src/
│   ├── app/
│   │   ├── app.component.ts
│   │   ├── app.component.html
│   │   ├── app.component.css
│   │   ├── app.module.ts
│   │   └── app-routing.module.ts
│   ├── assets/
│   ├── index.html
│   └── main.ts
├── package.json
└── angular.json
```

### **Lancer l'application**
```bash
cd todo-list-app
ng serve
# Ouvrir http://localhost:4200
```

---

## ⚙️ Étape 1.3 : Configuration du projet Angular

### **Fichiers de configuration principaux**

#### **1. angular.json - Configuration du workspace**
```json
{
  "$schema": "./node_modules/@angular/cli/lib/config/schema.json",
  "version": 1,
  "newProjectRoot": "projects",
  "projects": {
    "todo-list-app": {
      "projectType": "application",
      "schematics": {},
      "root": "",
      "sourceRoot": "src",
      "prefix": "app",
      "architect": {
        "build": {
          "builder": "@angular-devkit/build-angular:browser",
          "options": {
            "outputPath": "dist/todo-list-app",
            "index": "src/index.html",
            "main": "src/main.ts",
            "polyfills": ["zone.js"],
            "tsConfig": "tsconfig.app.json",
            "assets": ["src/favicon.ico", "src/assets"],
            "styles": ["src/styles.css"],
            "scripts": []
          }
        },
        "serve": {
          "builder": "@angular-devkit/build-angular:dev-server",
          "options": {
            "buildTarget": "todo-list-app:build"
          }
        }
      }
    }
  }
}
```

**Explications :**
- **`projectType`** : Type d'application (application, library)
- **`sourceRoot`** : Dossier source du code
- **`prefix`** : Préfixe des sélecteurs de composants (`app-`)
- **`architect`** : Configuration des tâches (build, serve, test)

#### **2. tsconfig.json - Configuration TypeScript**
```json
{
  "compileOnSave": false,
  "compilerOptions": {
    "baseUrl": "./",
    "outDir": "./dist/out-tsc",
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "noImplicitOverride": true,
    "noPropertyAccessFromIndexSignature": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true,
    "sourceMap": true,
    "declaration": false,
    "downlevelIteration": true,
    "experimentalDecorators": true,
    "moduleResolution": "node",
    "importHelpers": true,
    "target": "ES2022",
    "module": "ES2022",
    "useDefineForClassFields": false,
    "lib": ["ES2022", "dom"]
  },
  "angularCompilerOptions": {
    "enableI18nLegacyMessageIdFormat": false,
    "strictInjectionParameters": true,
    "strictInputAccessModifiers": true,
    "strictTemplates": true
  }
}
```

**Explications :**
- **`target`** : Version JavaScript cible (ES2022)
- **`strict`** : Mode strict TypeScript
- **`experimentalDecorators`** : Support des décorateurs Angular
- **`angularCompilerOptions`** : Options spécifiques au compilateur Angular

#### **3. package.json - Dépendances et scripts**
```json
{
  "name": "todo-list-app",
  "version": "0.0.0",
  "scripts": {
    "ng": "ng",
    "start": "ng serve",
    "build": "ng build",
    "watch": "ng build --watch --configuration development",
    "test": "ng test"
  },
  "private": true,
  "dependencies": {
    "@angular/animations": "^20.0.0",
    "@angular/common": "^20.0.0",
    "@angular/compiler": "^20.0.0",
    "@angular/core": "^20.0.0",
    "@angular/forms": "^20.0.0",
    "@angular/platform-browser": "^20.0.0",
    "@angular/platform-browser-dynamic": "^20.0.0",
    "@angular/router": "^20.0.0",
    "rxjs": "~7.8.0",
    "tslib": "^2.3.0",
    "zone.js": "~0.14.0"
  },
  "devDependencies": {
    "@angular-devkit/build-angular": "^20.0.0",
    "@angular/cli": "^20.0.0",
    "@angular/compiler-cli": "^20.0.0",
    "@types/jasmine": "~5.1.0",
    "jasmine-core": "~5.1.0",
    "karma": "~6.4.0",
    "karma-chrome-launcher": "~3.2.0",
    "karma-coverage": "~2.2.0",
    "karma-jasmine": "~5.1.0",
    "karma-jasmine-html-reporter": "~2.1.0",
    "typescript": "~5.4.0"
  }
}
```

**Explications :**
- **`dependencies`** : Packages requis en production
- **`devDependencies`** : Packages requis uniquement en développement
- **`scripts`** : Commandes npm personnalisées

#### **4. main.ts - Point d'entrée de l'application**
```typescript
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
```

**Explications :**
- **`bootstrapApplication`** : Démarre l'application Angular
- **`appConfig`** : Configuration globale de l'application
- **`AppComponent`** : Composant racine

#### **5. app.config.ts - Configuration de l'application**
```typescript
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app/app-routing.module';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes)
  ]
};
```

**Explications :**
- **`ApplicationConfig`** : Configuration globale
- **`providers`** : Services et dépendances disponibles globalement
- **`provideRouter`** : Configuration du routeur

### **Commandes Angular CLI utiles**

```bash
# Générer un composant
ng generate component mon-composant
ng g c mon-composant

# Générer un service
ng generate service mon-service
ng g s mon-service

# Générer un pipe
ng generate pipe mon-pipe
ng g p mon-pipe

# Générer une directive
ng generate directive ma-directive
ng g d ma-directive

# Construire pour la production
ng build --configuration production

# Lancer les tests
ng test

# Lancer le linter
ng lint
```

### **Structure des dossiers expliquée**

```
todo-list-app/
├── src/                    # Code source de l'application
│   ├── app/               # Composants, services, modules
│   ├── assets/            # Images, fonts, fichiers statiques
│   ├── index.html         # Page HTML principale
│   ├── main.ts            # Point d'entrée
│   ├── styles.css         # Styles globaux
│   └── app.config.ts      # Configuration de l'app
├── node_modules/          # Dépendances installées
├── angular.json           # Configuration du workspace
├── package.json           # Dépendances et scripts
├── tsconfig.json          # Configuration TypeScript
└── README.md              # Documentation
```

### **Variables d'environnement**

Créer `src/environments/environment.ts` :
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'TodoList App'
};
```

Créer `src/environments/environment.prod.ts` :
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.monapp.com',
  appName: 'TodoList App'
};
```

**Utilisation dans les services :**
```typescript
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiUrl;
  
  // ...
}
```

---

## 📝 Étape 1.4 : Configuration Git et bonnes pratiques

### **Initialisation du repository Git**
```bash
# Créer un repository sur GitHub
# Puis cloner ou initialiser localement
git init
git add .
git commit -m "feat: initial commit - projet Angular TodoList"

# Lier au repository GitHub
git remote add origin https://github.com/votre-username/todo-list-app.git
git branch -M main
git push -u origin main
```

### **Convention de commits (Conventional Commits)**
```bash
# Format : type(scope): description

# Exemples de commits :
git commit -m "feat: ajouter composant TodoList"
git commit -m "feat(auth): implémenter service d'authentification"
git commit -m "fix: corriger bug dans la suppression de todos"
git commit -m "refactor: améliorer la structure des services"
git commit -m "docs: ajouter documentation des composants"
git commit -m "test: ajouter tests pour TodoService"
git commit -m "style: améliorer le CSS du header"
git commit -m "perf: optimiser les performances du composant"

# Types de commits :
# feat     : Nouvelle fonctionnalité
# fix      : Correction de bug
# docs     : Documentation
# style    : Formatage, CSS
# refactor : Refactoring
# test     : Tests
# chore    : Tâches de maintenance
# perf     : Amélioration de performance
```

### **Workflow Git recommandé**
```bash
# 1. Créer une branche pour chaque feature
git checkout -b feature/ajout-authentification

# 2. Développer et commiter régulièrement
git add .
git commit -m "feat: ajouter formulaire de connexion"

# 3. Pousser la branche
git push origin feature/ajout-authentification

# 4. Créer une Pull Request sur GitHub

# 5. Après validation, merger dans main
git checkout main
git pull origin main
git branch -d feature/ajout-authentification
```

### **Règles de commit obligatoires**
- ✅ **Un commit par fonctionnalité** : Pas de commits multiples
- ✅ **Messages descriptifs** : Expliquer le "quoi" et le "pourquoi"
- ✅ **Tests avant commit** : Vérifier que tout fonctionne
- ✅ **Code review** : Demander validation si possible

---



## 🔧 Étape 1.4 : Configuration ESLint et bonnes pratiques

#### **1. Installation et configuration ESLint**
```bash
# Installer ESLint pour Angular
ng add @angular-eslint/schematics

# Les fichiers de configuration sont créés automatiquement

# Installer des règles supplémentaires (avec --legacy-peer-deps si conflit)
npm install --save-dev @typescript-eslint/eslint-plugin @typescript-eslint/parser --legacy-peer-deps
```

#### **2. Configuration ESLint (eslint.config.js)**
```javascript
// @ts-check
const eslint = require("@eslint/js");
const tseslint = require("typescript-eslint");
const angular = require("angular-eslint");

module.exports = tseslint.config(
  {
    files: ["**/*.ts"],
    extends: [
      eslint.configs.recommended,
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      ...angular.configs.tsRecommended,
    ],
    processor: angular.processInlineTemplates,
    rules: {
      "@angular-eslint/directive-selector": [
        "error",
        {
          type: "attribute",
          prefix: "app",
          style: "camelCase",
        },
      ],
      "@angular-eslint/component-selector": [
        "error",
        {
          type: "element",
          prefix: "app",
          style: "kebab-case",
        },
      ],
      // Règles strictes pour un code propre
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/no-empty-function": "error",
      "@typescript-eslint/no-unused-vars": "error",
      "no-console": ["warn", { "allow": ["warn", "error"] }],
      "quotes": ["error", "single"],
      "semi": ["error", "always"],
      "no-trailing-spaces": "error",
      "prefer-const": "error",
      "no-var": "error",
      "eqeqeq": ["error", "always"],
    },
  },
  {
    files: ["**/*.html"],
    extends: [
      ...angular.configs.templateRecommended,
      ...angular.configs.templateAccessibility,
    ],
    rules: {},
  }
);
```

#### **3. Configuration Prettier (.prettierrc)**
```json
{
  "tabWidth": 2,
  "useTabs": false,
  "singleQuote": true,
  "semi": true,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "arrowParens": "avoid",
  "printWidth": 100,
  "endOfLine": "lf"
}
```

**💡 Prettier** : Formate automatiquement votre code selon des règles définies. Il s'occupe de l'indentation, des espaces, des guillemets, etc. pour que tout le code ait le même style.

#### **4. Configuration Husky pour les pre-commit hooks**
```bash
# Installer Husky
npm install --save-dev husky lint-staged

# Initialiser Husky (nouvelle syntaxe)
npx husky init

# Configurer le hook pre-commit
# Le fichier .husky/pre-commit sera créé automatiquement
# Contenu du fichier .husky/pre-commit :
npx lint-staged
```

**💡 Husky** : Exécute automatiquement des scripts avant chaque commit Git. Il peut lancer ESLint, Prettier, ou des tests pour s'assurer que le code est propre avant d'être commité.

#### **5. Configuration lint-staged (.lintstagedrc.json)**
```json
{
  "*.ts": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.html": [
    "eslint --fix",
    "prettier --write"
  ],
  "*.css": [
    "prettier --write"
  ],
  "*.json": [
    "prettier --write"
  ]
}
```

**💡 lint-staged** : Exécute ESLint et Prettier uniquement sur les fichiers modifiés avant le commit. Cela rend les vérifications plus rapides et évite de traiter tous les fichiers du projet.

#### **6. Scripts package.json à ajouter**
```json
{
  "scripts": {
    "lint": "ng lint",
    "lint:fix": "ng lint --fix",
    "format": "prettier --write \"src/**/*.{ts,html,css,json}\"",
    "format:check": "prettier --check \"src/**/*.{ts,html,css,json}\"",
    "prepare": "husky"
  }
}
```

**💡 Scripts npm** : Commandes personnalisées pour lancer facilement ESLint, Prettier et Husky. `npm run lint` vérifie le code, `npm run format` le formate automatiquement.

#### **7. Configuration VS Code (.vscode/settings.json)**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "eslint.validate": [
    "javascript",
    "typescript",
    "html"
  ]
}
```

**💡 Configuration VS Code** : Configure l'éditeur pour formater automatiquement le code à la sauvegarde et corriger les erreurs ESLint. Cela rend le développement plus fluide.

---

## 🏗️ Étape 1.5 : Architecture DDD

### **Organisation des dossiers**
Créons la structure DDD dans `src/app/` :

```
src/app/
├── core/                    # Services globaux
│   ├── services/
│   │   ├── auth.service.ts
│   │   └── error-handler.service.ts
│   └── guards/
│       └── auth.guard.ts
├── shared/                  # Composants réutilisables
│   ├── components/
│   │   ├── header/
│   │   └── footer/
│   ├── pipes/
│   └── directives/
├── features/                # Modules métier
│   ├── auth/
│   │   ├── components/
│   │   ├── services/
│   │   └── models/
│   └── todos/
│       ├── components/
│       ├── services/
│       └── models/
└── infrastructure/          # Couche infrastructure
    ├── http/
    ├── storage/
    └── mock-data/
```

### **Création des dossiers**
```bash
# Créer la structure DDD
mkdir -p src/app/core/services
mkdir -p src/app/core/guards
mkdir -p src/app/shared/components
mkdir -p src/app/shared/pipes
mkdir -p src/app/shared/directives
mkdir -p src/app/features/auth/components
mkdir -p src/app/features/auth/services
mkdir -p src/app/features/auth/models
mkdir -p src/app/features/todos/components
mkdir -p src/app/features/todos/services
mkdir -p src/app/features/todos/models
mkdir -p src/app/infrastructure/http
mkdir -p src/app/infrastructure/storage
mkdir -p src/app/infrastructure/mock-data
```

**💡 Architecture DDD** : Organisation du code par domaine métier plutôt que par technique. Chaque feature est autonome avec ses propres composants, services et modèles.

### **Règles de code obligatoires**

#### **✅ DO (À faire)**
```typescript
// ✅ Typage strict
const userName: string = 'John';
const userAge: number = 25;
const isActive: boolean = true;

// ✅ Interfaces explicites
interface User {
  id: number;
  name: string;
  email: string;
}

// ✅ Fonctions typées
function getUserById(id: number): User | null {
  // Implementation
}

// ✅ Gestion d'erreurs
try {
  await this.todoService.createTodo(todo);
} catch (error) {
  console.error('Erreur lors de la création:', error);
}

// ✅ Noms descriptifs
const isUserAuthenticated = true;
const hasValidEmail = email.includes('@');
```

#### **❌ DON'T (À éviter)**
```typescript
// ❌ Pas de 'any'
const data: any = response.data;

// ❌ Pas de fonctions vides
function handleClick() {
  // TODO: Implémenter
}

// ❌ Pas de variables non utilisées
const unusedVariable = 'test';

// ❌ Pas de console.log en production
console.log('Debug info');

// ❌ Pas de noms non descriptifs
const x = 10;
const fn = () => {};

// ❌ Pas de == (utiliser ===)
if (value == null) { }

// ❌ Pas de var
var oldVariable = 'test';
```

### **Variables d'environnement**
```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  appName: 'TodoList App'
};
```

Créer `src/environments/environment.prod.ts` :
```typescript
export const environment = {
  production: true,
  apiUrl: 'https://api.monapp.com',
  appName: 'TodoList App'
};
```

**Utilisation dans les services :**
```typescript
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private apiUrl = environment.apiUrl;
  
  // ...
}
```

---



---

## 📝 Étape 1.6 : Modèles de données

### **Créer les interfaces (src/app/features/auth/models/user.model.ts)**
```typescript
export interface User {
  id: number;
  email: string;
  password: string;
  role: 'user' | 'admin';
  createdAt: Date;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  password: string;
  confirmPassword: string;
}
```

### **Créer les interfaces (src/app/features/todos/models/todo.model.ts)**
```typescript
export interface Todo {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  assignedTo?: number; // ID de l'utilisateur assigné
  createdBy: number;   // ID de l'utilisateur créateur
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTodoRequest {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo?: number;
}
```

---

## 🎨 Étape 1.7 : Composants de base

### **Header Component (src/app/shared/components/header/header.component.ts)**
```typescript
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [],
  template: `
    <header class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">TodoList App</h1>
        <nav>
          <ul class="flex space-x-4">
            <li><a routerLink="/todos" class="hover:text-blue-200">Todos</a></li>
            <li><a routerLink="/admin" class="hover:text-blue-200">Admin</a></li>
            <li><button (click)="logout()" class="hover:text-blue-200">Logout</button></li>
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: []
})
export class HeaderComponent {
  logout() {
    // TODO: Implémenter la déconnexion
    console.log('Logout clicked');
  }
}
```

### **App Component (src/app/app.component.ts)**
```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  template: `
    <app-header></app-header>
    <main class="container mx-auto p-4">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'todo-list-app';
}
```

---

## 🔗 Étape 1.8 : Routing de base

### **App Routing (src/app/app-routing.module.ts)**
```typescript
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'todos',
    loadChildren: () => import('./features/todos/todos.routes').then(m => m.TODOS_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  }
];
```

---

## 🔧 Étape 1.9 : Services et Mock Data

### **Créer le service Todo (src/app/features/todos/services/todo.service.ts)**
```typescript
import { Injectable, signal } from '@angular/core';
import { Todo, CreateTodoRequest } from '../models/todo.model';

@Injectable({
  providedIn: 'root'
})
export class TodoService {
  private todos = signal<Todo[]>([
    {
      id: 1,
      title: 'Apprendre Angular',
      description: 'Étudier les fondamentaux d\'Angular 20+',
      status: 'todo',
      priority: 'high',
      createdBy: 1,
      createdAt: new Date('2024-01-15'),
      updatedAt: new Date('2024-01-15')
    },
    {
      id: 2,
      title: 'Créer un projet',
      description: 'Développer une application TodoList',
      status: 'in-progress',
      priority: 'medium',
      createdBy: 1,
      createdAt: new Date('2024-01-14'),
      updatedAt: new Date('2024-01-16')
    },
    {
      id: 3,
      title: 'Configurer l\'environnement',
      description: 'Installer Node.js, Angular CLI et configurer VS Code',
      status: 'done',
      priority: 'high',
      createdBy: 1,
      createdAt: new Date('2024-01-13'),
      updatedAt: new Date('2024-01-14')
    }
  ]);

  // Simuler un délai réseau
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // GET - Récupérer tous les todos
  async getAllTodos(): Promise<Todo[]> {
    console.log('🔄 Service: Récupération de tous les todos...');
    await this.delay(300); // Simuler un appel API
    console.log('✅ Service: Todos récupérés avec succès');
    return this.todos();
  }

  // GET - Récupérer un todo par ID
  async getTodoById(id: number): Promise<Todo | undefined> {
    console.log(`🔄 Service: Récupération du todo ${id}...`);
    await this.delay(200);
    const todo = this.todos().find(t => t.id === id);
    console.log(`✅ Service: Todo ${id} récupéré:`, todo);
    return todo;
  }

  // POST - Créer un nouveau todo
  async createTodo(todoData: CreateTodoRequest): Promise<Todo> {
    console.log('🔄 Service: Création d\'un nouveau todo...', todoData);
    await this.delay(400);
    
    const newTodo: Todo = {
      id: Date.now(),
      title: todoData.title,
      description: todoData.description || '',
      status: 'todo',
      priority: todoData.priority,
      assignedTo: todoData.assignedTo,
      createdBy: 1, // TODO: Récupérer l'ID de l'utilisateur connecté
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.todos.update(todos => [...todos, newTodo]);
    console.log('✅ Service: Todo créé avec succès:', newTodo);
    return newTodo;
  }

  // PUT - Mettre à jour un todo
  async updateTodo(id: number, updates: Partial<Todo>): Promise<Todo | undefined> {
    console.log(`🔄 Service: Mise à jour du todo ${id}...`, updates);
    await this.delay(300);
    
    let updatedTodo: Todo | undefined;
    this.todos.update(todos => 
      todos.map(todo => {
        if (todo.id === id) {
          updatedTodo = { 
            ...todo, 
            ...updates, 
            updatedAt: new Date() 
          };
          return updatedTodo;
        }
        return todo;
      })
    );
    
    console.log(`✅ Service: Todo ${id} mis à jour:`, updatedTodo);
    return updatedTodo;
  }

  // DELETE - Supprimer un todo
  async deleteTodo(id: number): Promise<boolean> {
    console.log(`🔄 Service: Suppression du todo ${id}...`);
    await this.delay(250);
    
    let deleted = false;
    this.todos.update(todos => {
      const initialLength = todos.length;
      const filtered = todos.filter(todo => todo.id !== id);
      deleted = filtered.length < initialLength;
      return filtered;
    });
    
    console.log(`✅ Service: Todo ${id} supprimé:`, deleted);
    return deleted;
  }

  // Méthodes utilitaires
  getTodosByStatus(status: Todo['status']): Todo[] {
    return this.todos().filter(todo => todo.status === status);
  }

  getTodosByPriority(priority: Todo['priority']): Todo[] {
    return this.todos().filter(todo => todo.priority === priority);
  }
}
```

### **Créer le service Auth (src/app/features/auth/services/auth.service.ts)**
```typescript
import { Injectable, signal } from '@angular/core';
import { User, LoginRequest, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = signal<User[]>([
    {
      id: 1,
      email: 'admin@example.com',
      password: 'admin123', // En production, ce serait hashé
      role: 'admin',
      createdAt: new Date('2024-01-01')
    },
    {
      id: 2,
      email: 'user@example.com',
      password: 'user123',
      role: 'user',
      createdAt: new Date('2024-01-02')
    }
  ]);

  private currentUser = signal<User | null>(null);

  // Simuler un délai réseau
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // POST - Connexion
  async login(credentials: LoginRequest): Promise<{ success: boolean; user?: User; error?: string }> {
    console.log('🔄 Service: Tentative de connexion...', credentials.email);
    await this.delay(500);
    
    const user = this.users().find(u => 
      u.email === credentials.email && u.password === credentials.password
    );
    
    if (user) {
      this.currentUser.set(user);
      console.log('✅ Service: Connexion réussie pour:', user.email);
      return { success: true, user };
    } else {
      console.log('❌ Service: Échec de connexion pour:', credentials.email);
      return { success: false, error: 'Email ou mot de passe incorrect' };
    }
  }

  // POST - Inscription
  async register(userData: RegisterRequest): Promise<{ success: boolean; user?: User; error?: string }> {
    console.log('🔄 Service: Tentative d\'inscription...', userData.email);
    await this.delay(600);
    
    // Vérifier si l'email existe déjà
    if (this.users().some(u => u.email === userData.email)) {
      console.log('❌ Service: Email déjà utilisé:', userData.email);
      return { success: false, error: 'Cet email est déjà utilisé' };
    }
    
    // Vérifier que les mots de passe correspondent
    if (userData.password !== userData.confirmPassword) {
      console.log('❌ Service: Mots de passe différents');
      return { success: false, error: 'Les mots de passe ne correspondent pas' };
    }
    
    const newUser: User = {
      id: Date.now(),
      email: userData.email,
      password: userData.password,
      role: 'user',
      createdAt: new Date()
    };
    
    this.users.update(users => [...users, newUser]);
    this.currentUser.set(newUser);
    
    console.log('✅ Service: Inscription réussie pour:', newUser.email);
    return { success: true, user: newUser };
  }

  // POST - Déconnexion
  async logout(): Promise<void> {
    console.log('🔄 Service: Déconnexion...');
    await this.delay(200);
    this.currentUser.set(null);
    console.log('✅ Service: Déconnexion réussie');
  }

  // GET - Vérifier si l'utilisateur est connecté
  isAuthenticated(): boolean {
    return this.currentUser() !== null;
  }

  // GET - Récupérer l'utilisateur actuel
  getCurrentUser(): User | null {
    return this.currentUser();
  }

  // GET - Vérifier si l'utilisateur est admin
  isAdmin(): boolean {
    return this.currentUser()?.role === 'admin';
  }

  // GET - Récupérer tous les utilisateurs (admin seulement)
  async getAllUsers(): Promise<User[]> {
    console.log('🔄 Service: Récupération de tous les utilisateurs...');
    await this.delay(400);
    
    if (!this.isAdmin()) {
      throw new Error('Accès non autorisé');
    }
    
    console.log('✅ Service: Utilisateurs récupérés');
    return this.users().map(user => ({
      ...user,
      password: '***' // Masquer les mots de passe
    }));
  }
}
```

---

## 🎯 Étape 1.10 : Composant Todo List avec Services

### **Todo List Component (src/app/features/todos/components/todo-list.component.ts)**
```typescript
import { Component, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Todo } from '../models/todo.model';
import { TodoService } from '../services/todo.service';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="max-w-4xl mx-auto">
      <h2 class="text-3xl font-bold mb-6">Mes Todos</h2>
      
      <!-- Loading state -->
      @if (loading()) {
        <div class="text-center py-8">
          <div class="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <p class="mt-2 text-gray-600">Chargement des todos...</p>
        </div>
      } @else {
        <!-- Formulaire d'ajout -->
        <div class="bg-white p-6 rounded-lg shadow-md mb-6">
          <h3 class="text-xl font-semibold mb-4">Ajouter une tâche</h3>
          <form (ngSubmit)="addTodo()" #todoForm="ngForm">
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <input 
                type="text" 
                [(ngModel)]="newTodo.title" 
                name="title"
                placeholder="Titre de la tâche"
                class="border p-2 rounded"
                required>
              
              <input 
                type="text" 
                [(ngModel)]="newTodo.description" 
                name="description"
                placeholder="Description (optionnel)"
                class="border p-2 rounded">
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
              <select 
                [(ngModel)]="newTodo.priority" 
                name="priority"
                class="border p-2 rounded">
                <option value="low">Basse priorité</option>
                <option value="medium">Priorité moyenne</option>
                <option value="high">Haute priorité</option>
              </select>
              
              <button 
                type="submit" 
                [disabled]="!todoForm.form.valid || addingTodo()"
                class="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50">
                @if (addingTodo()) {
                  <span class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                  Ajout en cours...
                } @else {
                  Ajouter
                }
              </button>
            </div>
          </form>
        </div>

        <!-- Liste des todos -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <!-- Colonne Todo -->
          <div class="bg-gray-100 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-4 text-gray-700">
              À faire ({{ getTodosByStatus('todo').length }})
            </h3>
            @for (todo of getTodosByStatus('todo'); track todo.id) {
              <div class="bg-white p-4 rounded shadow mb-3">
                <h4 class="font-semibold">{{ todo.title }}</h4>
                @if (todo.description) {
                  <p class="text-gray-600 text-sm mt-1">{{ todo.description }}</p>
                }
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs px-2 py-1 rounded" 
                        [ngClass]="{
                          'bg-red-100 text-red-800': todo.priority === 'high',
                          'bg-yellow-100 text-yellow-800': todo.priority === 'medium',
                          'bg-green-100 text-green-800': todo.priority === 'low'
                        }">
                    {{ todo.priority | titlecase }}
                  </span>
                  <button 
                    (click)="updateStatus(todo.id, 'in-progress')"
                    class="text-blue-600 hover:text-blue-800">
                    Commencer
                  </button>
                </div>
              </div>
            }
          </div>

          <!-- Colonne In Progress -->
          <div class="bg-gray-100 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-4 text-blue-700">
              En cours ({{ getTodosByStatus('in-progress').length }})
            </h3>
            @for (todo of getTodosByStatus('in-progress'); track todo.id) {
              <div class="bg-white p-4 rounded shadow mb-3">
                <h4 class="font-semibold">{{ todo.title }}</h4>
                @if (todo.description) {
                  <p class="text-gray-600 text-sm mt-1">{{ todo.description }}</p>
                }
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs px-2 py-1 rounded" 
                        [ngClass]="{
                          'bg-red-100 text-red-800': todo.priority === 'high',
                          'bg-yellow-100 text-yellow-800': todo.priority === 'medium',
                          'bg-green-100 text-green-800': todo.priority === 'low'
                        }">
                    {{ todo.priority | titlecase }}
                  </span>
                  <button 
                    (click)="updateStatus(todo.id, 'done')"
                    class="text-green-600 hover:text-green-800">
                    Terminer
                  </button>
                </div>
              </div>
            }
          </div>

          <!-- Colonne Done -->
          <div class="bg-gray-100 p-4 rounded-lg">
            <h3 class="text-lg font-semibold mb-4 text-green-700">
              Terminé ({{ getTodosByStatus('done').length }})
            </h3>
            @for (todo of getTodosByStatus('done'); track todo.id) {
              <div class="bg-white p-4 rounded shadow mb-3 opacity-75">
                <h4 class="font-semibold line-through">{{ todo.title }}</h4>
                @if (todo.description) {
                  <p class="text-gray-600 text-sm mt-1 line-through">{{ todo.description }}</p>
                }
                <div class="flex justify-between items-center mt-2">
                  <span class="text-xs px-2 py-1 rounded bg-green-100 text-green-800">
                    {{ todo.priority | titlecase }}
                  </span>
                  <button 
                    (click)="deleteTodo(todo.id)"
                    class="text-red-600 hover:text-red-800">
                    Supprimer
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      }
    </div>
  `,
  styles: []
})
export class TodoListComponent implements OnInit {
  todos = signal<Todo[]>([]);
  loading = signal(true);
  addingTodo = signal(false);

  newTodo = {
    title: '',
    description: '',
    priority: 'medium' as const
  };

  constructor(private todoService: TodoService) {}

  async ngOnInit() {
    await this.loadTodos();
  }

  async loadTodos() {
    try {
      this.loading.set(true);
      const todos = await this.todoService.getAllTodos();
      this.todos.set(todos);
    } catch (error) {
      console.error('Erreur lors du chargement des todos:', error);
    } finally {
      this.loading.set(false);
    }
  }

  async addTodo() {
    if (this.newTodo.title.trim()) {
      try {
        this.addingTodo.set(true);
        await this.todoService.createTodo({
          title: this.newTodo.title,
          description: this.newTodo.description,
          priority: this.newTodo.priority
        });
        
        // Recharger les todos
        await this.loadTodos();
        
        // Réinitialiser le formulaire
        this.newTodo.title = '';
        this.newTodo.description = '';
      } catch (error) {
        console.error('Erreur lors de l\'ajout du todo:', error);
      } finally {
        this.addingTodo.set(false);
      }
    }
  }

  async updateStatus(id: number, status: Todo['status']) {
    try {
      await this.todoService.updateTodo(id, { status });
      await this.loadTodos();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    }
  }

  async deleteTodo(id: number) {
    try {
      await this.todoService.deleteTodo(id);
      await this.loadTodos();
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  }

  // Méthodes utilitaires
  getTodosByStatus(status: Todo['status']): Todo[] {
    return this.todos().filter(todo => todo.status === status);
  }
}
```

---

## 🔧 Étape 1.11 : Configuration finale

### **Mettre à jour app.component.ts**
```typescript
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './shared/components/header/header.component';
import { TodoListComponent } from './features/todos/components/todo-list.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, TodoListComponent],
  template: `
    <app-header></app-header>
    <main class="container mx-auto p-4">
      <app-todo-list></app-todo-list>
    </main>
  `,
  styles: []
})
export class AppComponent {
  title = 'todo-list-app';
}
```

### **Ajouter Tailwind CSS et configuration complète**
```bash
# Installer Tailwind CSS v3 (version stable) et ses dépendances
npm install -D tailwindcss@^3.4.0 postcss@^8.4.0 autoprefixer@^10.4.0

# Créer la configuration Tailwind
npx tailwindcss init
```

**⚠️ Important : Version de Tailwind CSS**
- **Utilisez Tailwind CSS v3.4.0** (version stable)
- **Évitez Tailwind CSS v4** (version expérimentale qui cause des erreurs)
- Si vous rencontrez l'erreur "Cannot use `tailwindcss` directly as a PostCSS plugin", c'est que vous avez la v4
- Solution : `npm uninstall tailwindcss` puis `npm install -D tailwindcss@^3.4.0`

**tailwind.config.js**
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**postcss.config.js**
```javascript
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

**src/styles.scss**
```scss
@tailwind base;
@tailwind components;
@tailwind utilities;
```

**Configuration VS Code pour Tailwind (.vscode/settings.json)**
```json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "typescript.suggest.autoImports": true,
  "typescript.updateImportsOnFileMove.enabled": "always",
  "eslint.validate": [
    "javascript",
    "typescript",
    "html"
  ],
  "css.validate": false,
  "scss.validate": false,
  "less.validate": false,
  "tailwindCSS.includeLanguages": {
    "typescript": "html",
    "typescriptreact": "html"
  },
  "tailwindCSS.experimental.classRegex": [
    ["class\\s*=\\s*['\"`]([^'\"`]*).*?['\"`]", "([^'\"`]*)"]
  ]
}
```

**💡 Configuration Tailwind** : Tailwind CSS fournit des classes utilitaires pour un développement rapide. La configuration PostCSS permet de traiter les directives @tailwind. La configuration VS Code désactive les erreurs de validation CSS et ajoute le support Tailwind.

---

## 🧪 Test et Validation de la Partie 1

### **Vérification de l'installation**
```bash
# Vérifier que tout fonctionne
npm run lint
ng serve

# Ouvrir http://localhost:4200
# Vérifier que l'application se lance sans erreur
```

### **Test des fonctionnalités**
1. ✅ **Interface TodoList** : Voir les 3 colonnes (À faire, En cours, Terminé)
2. ✅ **Ajout de todo** : Remplir le formulaire et ajouter une tâche
3. ✅ **Changement de statut** : Cliquer sur "Commencer" puis "Terminer"
4. ✅ **Suppression** : Supprimer une tâche terminée
5. ✅ **Priorités** : Voir les badges de couleur selon la priorité
6. ✅ **Loading states** : Voir les spinners pendant les opérations

### **Test des services**
1. ✅ **Console du navigateur** : Voir les logs des appels API simulés
2. ✅ **Délais** : Observer les délais artificiels (200-600ms)

### **Vérification de la structure des fichiers**
```bash
# Structure finale attendue
src/app/
├── app.component.ts          # Composant principal
├── app.config.ts            # Configuration de l'app
├── app.routes.ts            # Routes principales
├── app.scss                 # Styles globaux
├── core/                    # Services et guards
├── shared/                  # Composants partagés
│   └── components/
│       └── header/
│           └── header.component.ts
├── features/                # Modules fonctionnels
│   ├── auth/
│   │   ├── auth.routes.ts
│   │   ├── components/
│   │   ├── models/
│   │   │   └── user.model.ts
│   │   └── services/
│   ├── todos/
│   │   ├── todos.routes.ts
│   │   ├── components/
│   │   │   └── todo-list.component.ts
│   │   ├── models/
│   │   │   └── todo.model.ts
│   │   └── services/
│   │       └── todo.service.ts
│   └── admin/
│       └── admin.routes.ts
└── infrastructure/          # Couche infrastructure
```

### **Fichiers de configuration requis**
```bash
# Fichiers de configuration
├── angular.json             # Configuration Angular
├── tailwind.config.js       # Configuration Tailwind
├── postcss.config.js        # Configuration PostCSS
├── eslint.config.js         # Configuration ESLint
├── .prettierrc             # Configuration Prettier
├── .lintstagedrc.json      # Configuration lint-staged
└── .husky/                 # Hooks Git
    └── pre-commit
```
3. ✅ **Gestion d'erreurs** : Vérifier les try/catch dans la console

### **Test de la configuration**
1. ✅ **ESLint** : `npm run lint` ne doit pas avoir d'erreurs
2. ✅ **Pre-commit hook** : Essayer de commiter avec une erreur ESLint
3. ✅ **Formatage** : Vérifier que Prettier formate automatiquement
4. ✅ **Tailwind** : Vérifier que les classes CSS fonctionnent

---

## 🎯 État actuel de l'application

### **Fonctionnalités implémentées :**
- ✅ **Architecture DDD** : Structure de dossiers organisée par domaine
- ✅ **Composants** : Header, TodoList avec interface Kanban
- ✅ **Services** : TodoService et AuthService avec mock data
- ✅ **Data binding** : Two-way binding avec ngModel
- ✅ **Directives** : @if, @for (nouveau control flow Angular 20+)
- ✅ **Pipes** : titlecase pour l'affichage des priorités
- ✅ **Signals** : Gestion d'état réactive
- ✅ **Routing** : Configuration de base (prêt pour les prochaines parties)
- ✅ **Styling** : Tailwind CSS avec interface moderne

### **Données de test disponibles :**
- **Utilisateurs** : admin@example.com (admin123), user@example.com (user123)
- **Todos** : 3 todos pré-chargés avec différents statuts et priorités

### **Prêt pour la Partie 2 :**
- ✅ Authentification (login/register)
- ✅ Routing avancé avec lazy loading
- ✅ Formulaires réactifs
- ✅ Guards de protection

---

*💡 **Conseil du mentor :** Prenez le temps de tester chaque fonctionnalité. Les services avec mock data vous donnent une vraie expérience de développement frontend. Observez les logs dans la console pour comprendre le flux des données.*

*🔧 **Conseil qualité :** La Partie 1 pose les fondations solides. L'architecture DDD et les bonnes pratiques vous serviront pour toute la suite du cours et dans vos projets professionnels.*

---

## 🚀 Préparation pour la Partie 2

### **Objectifs de la Partie 2 :**
- 🔐 **Authentification complète** : Login/Register avec formulaires réactifs
- 🛡️ **Guards de protection** : Protection des routes selon le rôle
- 🔄 **Routing avancé** : Lazy loading des modules
- 📝 **Formulaires réactifs** : FormBuilder, Validators, gestion d'erreurs
- 🎨 **Interface admin** : Gestion des utilisateurs et attribution des tickets

### **Concepts à maîtriser :**
- **ReactiveFormsModule** : FormBuilder, FormGroup, FormControl
- **Validators** : Required, Email, MinLength, Pattern
- **Route Guards** : CanActivate, CanDeactivate
- **Lazy Loading** : Chargement à la demande des modules
- **Interceptors** : Gestion des tokens d'authentification

### **Prérequis validés :**
- ✅ Architecture DDD en place
- ✅ Services avec mock data fonctionnels
- ✅ Composants de base créés
- ✅ Configuration ESLint/Prettier active
- ✅ Git et bonnes pratiques configurés

---

*🎯 **Prêt pour la Partie 2 !** Votre application TodoList a maintenant une base solide avec une architecture propre et des fonctionnalités de base. Dans la Partie 2, nous ajouterons l'authentification et les formulaires réactifs pour créer une expérience utilisateur complète.* 



# Partie 2 : Authentification et Formulaires Réactifs

## 🎯 Objectifs de la Partie 2

À la fin de cette partie, vous serez capable de :
- ✅ Créer des formulaires réactifs avec validation
- ✅ Implémenter l'authentification complète (login/register)
- ✅ Utiliser les Guards pour protéger les routes
- ✅ Maîtriser le lazy loading des modules
- ✅ Gérer les intercepteurs HTTP
- ✅ Créer une interface admin fonctionnelle

---

## 🔐 Étape 2.1 : Formulaires Réactifs

### **✅ Étape 2.1 : Formulaires Réactifs - TERMINÉE**

**Implémentation :**
- ✅ Composant Login avec ReactiveFormsModule
- ✅ Composant Register avec validation avancée
- ✅ Validateur personnalisé passwordMatchValidator
- ✅ Gestion des erreurs en temps réel
- ✅ Navigation entre Login et Register

---

## 🛡️ Étape 2.2 : Guards de Protection

### **✅ Étape 2.2 : Guards de Protection - TERMINÉE**

**Implémentation :**
- ✅ AuthGuard pour protéger les routes authentifiées
- ✅ AdminGuard pour protéger les routes admin
- ✅ Redirection automatique vers login si non authentifié
- ✅ Gestion du returnUrl pour la redirection post-login

---

## 🔄 Étape 2.3 : Lazy Loading Avancé

### **✅ Étape 2.3 : Lazy Loading Avancé - TERMINÉE**

**Implémentation :**
- ✅ Lazy loading déjà configuré dans les routes
- ✅ Composant Register avec validation avancée
- ✅ Navigation croisée entre Login et Register
- ✅ Chargement à la demande des modules

---

## 👑 Étape 2.4 : Interface Admin

### **✅ Étape 2.4 : Interface Admin - TERMINÉE**

**Implémentation :**
- ✅ Tableau de bord avec statistiques en temps réel
- ✅ Gestion avancée des utilisateurs (changement de rôle)
- ✅ Gestion avancée des tickets (statut, priorité, attribution)
- ✅ Interface avec onglets (utilisateurs/tickets)
- ✅ Protection contre auto-suppression et auto-changement de rôle

---

## 🌐 Étape 2.5 : Intercepteurs HTTP

### **✅ Étape 2.5 : Intercepteurs HTTP - TERMINÉE**

**Implémentation :**
- ✅ Intercepteur d'authentification (ajout automatique des tokens)
- ✅ Intercepteur de loading (gestion des requêtes actives)
- ✅ Service ErrorService pour la gestion centralisée des erreurs
- ✅ Composant NotificationsComponent pour les toast notifications
- ✅ Gestion automatique des erreurs 401/403/500
- ✅ Notifications avec auto-suppression et design responsive

**Fonctionnalités :**
- 🔐 **Authentification automatique** : Ajout du token JWT aux headers
- ⏱️ **Loading states** : Compteur de requêtes actives
- 🔔 **Notifications toast** : Error, warning, info avec design adaptatif
- 🛡️ **Gestion d'erreurs** : Centralisée avec ErrorService
- 📊 **Logging** : Traçage des requêtes avec durée

---

## 🎯 Étape 2.6 : Validation Avancée

### **✅ Étape 2.6 : Validation Avancée - TERMINÉE**

**Implémentation :**
- ✅ Validateur personnalisé passwordMatchValidator
- ✅ Validation en temps réel avec messages d'erreur
- ✅ Gestion des erreurs de validation dans les formulaires
- ✅ Validation croisée (mot de passe et confirmation)
- ✅ Messages d'erreur contextuels et informatifs

---

### **Pourquoi les Formulaires Réactifs ?**

Les formulaires réactifs d'Angular offrent plusieurs avantages par rapport aux formulaires template-driven :

#### **🔄 Réactivité et Performance**
- **Signals intégrés** : Les formulaires réactifs utilisent les Signals d'Angular 20+ pour une réactivité optimale
- **Détection de changements efficace** : Seuls les champs modifiés déclenchent des mises à jour
- **Moins de cycles de détection** : Performance améliorée pour les formulaires complexes

#### **🧪 Testabilité**
- **Logique métier séparée** : La logique du formulaire est dans le composant, pas dans le template
- **Tests unitaires facilités** : Possibilité de tester la logique sans DOM
- **Validation centralisée** : Plus facile à tester et maintenir

#### **🎛️ Contrôle granulaire**
- **Validation en temps réel** : Validation dynamique selon l'état des autres champs
- **Transformations de données** : Possibilité de transformer les valeurs avant affichage
- **Gestion d'état avancée** : Contrôle précis de l'état du formulaire

### **Installation des modules requis**

```bash
# Les modules sont déjà inclus dans Angular 20+ par défaut
# ReactiveFormsModule est disponible dans @angular/forms
```

### **Création du composant de login**

```bash
# Créer le composant de login
ng generate component features/auth/components/login
```

### **Création du service AuthService**

```bash
# Créer le service d'authentification
ng generate service features/auth/services/auth
```

### **Mise à jour des modèles utilisateur**

```typescript
// src/app/features/auth/models/user.model.ts
export interface User {
  id: number;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface RegisterRequest {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}
```

### **Implémentation du service AuthService**

```typescript
// src/app/features/auth/services/auth.ts
import { Injectable, signal } from '@angular/core';
import { Observable, of, throwError, delay } from 'rxjs';
import { User, LoginRequest, RegisterRequest } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUser = signal<User | null>(null);
  public currentUser$ = this.currentUser.asReadonly();

  // Mock data - utilisateurs de test
  private users: User[] = [
    {
      id: 1,
      name: 'Admin User',
      email: 'admin@example.com',
      role: 'admin'
    },
    {
      id: 2,
      name: 'Normal User',
      email: 'user@example.com',
      role: 'user'
    }
  ];

  // Mock data - mots de passe (en réalité, ils seraient hashés)
  private passwords: { [key: string]: string } = {
    'admin@example.com': 'admin123',
    'user@example.com': 'user123'
  };

  constructor() {
    // Vérifier s'il y a un utilisateur en session
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      this.currentUser.set(JSON.parse(savedUser));
    }
  }

  login(credentials: LoginRequest): Observable<User> {
    const user = this.users.find(u => u.email === credentials.email);
    const password = this.passwords[credentials.email];

    if (user && password === credentials.password) {
      // Simuler un délai réseau
      return of(user).pipe(delay(500));
    } else {
      return throwError(() => new Error('Email ou mot de passe incorrect'));
    }
  }

  register(userData: RegisterRequest): Observable<User> {
    // Vérifier si l'email existe déjà
    const existingUser = this.users.find(u => u.email === userData.email);
    if (existingUser) {
      return throwError(() => new Error('Cet email est déjà utilisé'));
    }

    // Créer un nouvel utilisateur
    const newUser: User = {
      id: this.users.length + 1,
      name: userData.name,
      email: userData.email,
      role: 'user'
    };

    // Ajouter aux mock data
    this.users.push(newUser);
    this.passwords[userData.email] = userData.password;

    // Simuler un délai réseau
    return of(newUser).pipe(delay(500));
  }

  logout(): void {
    this.currentUser.set(null);
    localStorage.removeItem('currentUser');
  }

  getCurrentUser(): User | null {
    return this.currentUser();
  }

  getAllUsers(): Observable<User[]> {
    return of(this.users).pipe(delay(300));
  }

  deleteUser(userId: number): Observable<void> {
    const index = this.users.findIndex(u => u.id === userId);
    if (index !== -1) {
      this.users.splice(index, 1);
      return of(void 0).pipe(delay(300));
    }
    return throwError(() => new Error('Utilisateur non trouvé'));
  }

  getToken(): string | null {
    const user = this.currentUser();
    return user ? `mock-token-${user.id}` : null;
  }

  // Méthode pour définir l'utilisateur connecté (utilisée après login)
  setCurrentUser(user: User): void {
    this.currentUser.set(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  }
}
```

### **Implémentation du formulaire de login**
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Connexion à votre compte
          </h2>
        </div>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('email')"
            />
            @if (isFieldInvalid('email')) {
              <p class="mt-1 text-sm text-red-600">
                {{ getFieldError('email') }}
              </p>
            }
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              formControlName="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('password')"
            />
            @if (isFieldInvalid('password')) {
              <p class="mt-1 text-sm text-red-600">
                {{ getFieldError('password') }}
              </p>
            }
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              [disabled]="loginForm.invalid || loading()"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              @if (loading()) {
                <span class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Connexion en cours...
              } @else {
                Se connecter
              }
            </button>
          </div>

          <!-- Error Message -->
          @if (error()) {
            <div class="bg-red-50 border border-red-200 rounded-md p-4">
              <p class="text-sm text-red-600">{{ error() }}</p>
            </div>
          }
        </form>
      </div>
    </div>
  `
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm: FormGroup;
  loading = signal(false);
  error = signal<string>('');

  constructor() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      this.loading.set(true);
      this.error.set('');

      this.authService.login(this.loginForm.value).subscribe({
        next: (user) => {
          this.loading.set(false);
          this.router.navigate(['/todos']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.message || 'Erreur de connexion');
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.loginForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.loginForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Ce champ est requis';
      if (field.errors['email']) return 'Format d\'email invalide';
      if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
    }
    return '';
  }
}

### **Mise à jour du header avec gestion d'authentification**

```typescript
// src/app/shared/components/header/header.component.ts
import { Component, inject, signal } from '@angular/core';
import { RouterLink, Router } from '@angular/router';
import { AuthService } from '../../../features/auth/services/auth';
import { User } from '../../../features/auth/models/user.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  template: `
    <header class="bg-blue-600 text-white p-4">
      <div class="container mx-auto flex justify-between items-center">
        <h1 class="text-2xl font-bold">TodoList App</h1>
        <nav>
          <ul class="flex space-x-4">
            @if (currentUser()) {
              <li><a routerLink="/todos" class="hover:text-blue-200">Todos</a></li>
              @if (currentUser()?.role === 'admin') {
                <li><a routerLink="/admin" class="hover:text-blue-200">Admin</a></li>
              }
              <li><button (click)="logout()" class="hover:text-blue-200">Logout</button></li>
            } @else {
              <li><a routerLink="/auth/login" class="hover:text-blue-200">Login</a></li>
              <li><a routerLink="/auth/register" class="hover:text-blue-200">Register</a></li>
            }
          </ul>
        </nav>
      </div>
    </header>
  `,
  styles: [],
})
export class HeaderComponent {
  private authService = inject(AuthService);
  private router = inject(Router);
  
  currentUser = this.authService.currentUser$;

  constructor() {
    // Utiliser directement le signal du service
    this.currentUser = this.authService.currentUser$;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/auth/login']);
  }
}
```

### **Mise à jour des routes d'authentification**

```typescript
// src/app/features/auth/auth.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    // TODO: Ajouter RegisterComponent dans la Partie 2
    redirectTo: '/todos',
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
```

---

## 🧪 Test fonctionnel - Étape 2.1 : Formulaires Réactifs

### **Vérifications à effectuer :**

#### **1. Test du formulaire de login**
```bash
# Lancer l'application
ng serve

# Aller sur http://localhost:4200/auth/login
```

**✅ Tests à réaliser :**
- [ ] Le formulaire s'affiche correctement
- [ ] Les champs email et password sont présents
- [ ] Le bouton "Se connecter" est désactivé si le formulaire est invalide
- [ ] La validation email fonctionne (format invalide → erreur)
- [ ] La validation password fonctionne (moins de 6 caractères → erreur)
- [ ] Le bouton se connecte avec les identifiants : `admin@example.com` / `admin123`
- [ ] Après connexion, redirection vers `/todos`

#### **2. Test de la validation en temps réel**
- [ ] Taper un email invalide → message d'erreur apparaît
- [ ] Taper un mot de passe court → message d'erreur apparaît
- [ ] Corriger les erreurs → messages disparaissent
- [ ] Le bouton s'active quand le formulaire est valide

#### **3. Test des erreurs de connexion**
- [ ] Essayer de se connecter avec des identifiants invalides
- [ ] Vérifier que le message d'erreur s'affiche
- [ ] Vérifier que le bouton de chargement fonctionne

**🔧 Debug en cas de problème :**
```bash
# Vérifier les erreurs dans la console
F12 → Console

# Vérifier que le composant est bien créé
ng generate component features/auth/components/login --dry-run
```
```

### **🔧 Corrections importantes apportées**

#### **Types et interfaces**
- **User interface** : Ajout de la propriété `name` manquante
- **RegisterRequest** : Ajout de la propriété `name` pour l'inscription
- **Passwords object** : Typage correct avec `{ [key: string]: string }`

#### **Signals vs Observables**
- **Header component** : Utilisation directe du signal `currentUser$` du service
- **Pas de subscribe** : Les signals n'utilisent pas `.subscribe()` comme les Observables

#### **Gestion d'état**
- **localStorage** : Persistance de session avec sauvegarde/restauration automatique
- **Navigation dynamique** : Header adaptatif selon l'état de connexion

### **Explication technique : FormBuilder et FormGroup**
- **Pattern Builder** : Simplifie la création de formulaires complexes
- **Type Safety** : TypeScript peut inférer les types des contrôles
- **Réactivité** : Intégration native avec les Signals d'Angular 20+

#### **📋 FormGroup**
- **Conteneur de contrôles** : Gère un ensemble de FormControl
- **Validation globale** : Peut valider l'ensemble du formulaire
- **État réactif** : Émet des événements lors des changements

#### **🎛️ FormControl**
- **Contrôle individuel** : Gère un champ de formulaire
- **Validation locale** : Validators appliqués au niveau du champ
- **État en temps réel** : dirty, touched, valid, etc.

---

## 🛡️ Étape 2.2 : Guards de Protection

### **Pourquoi les Guards ?**

Les Guards permettent de contrôler l'accès aux routes selon des conditions métier :

#### **🔒 Sécurité**
- **Protection des routes** : Empêcher l'accès non autorisé
- **Redirection automatique** : Rediriger vers login si non authentifié
- **Validation des permissions** : Vérifier les rôles utilisateur

#### **🎯 Expérience utilisateur**
- **Navigation fluide** : Redirection automatique sans erreur 404
- **Feedback immédiat** : L'utilisateur sait pourquoi il ne peut pas accéder
- **État cohérent** : L'application reste dans un état valide

### **Création du Guard d'authentification**

```typescript
// src/app/core/guards/auth.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { map, take } from 'rxjs/operators';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1), // Prendre seulement la première valeur
    map(user => {
      if (user) {
        return true; // Accès autorisé
      } else {
        // Rediriger vers login avec l'URL de retour
        router.navigate(['/auth/login'], {
          queryParams: { returnUrl: state.url }
        });
        return false; // Accès refusé
      }
    })
  );
};
```

### **Création du Guard admin**

```typescript
// src/app/core/guards/admin.guard.ts
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../features/auth/services/auth.service';
import { map, take } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.currentUser$.pipe(
    take(1),
    map(user => {
      if (user && user.role === 'admin') {
        return true; // Accès admin autorisé
      } else {
        // Rediriger vers la page d'accueil
        router.navigate(['/todos']);
        return false; // Accès refusé
      }
    })
  );
};
```

### **Application des Guards aux routes**

```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { adminGuard } from './core/guards/admin.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/todos',
    pathMatch: 'full'
  },
  {
    path: 'todos',
    canActivate: [authGuard], // Protection par authentification
    loadChildren: () => import('./features/todos/todos.routes').then(m => m.TODOS_ROUTES)
  },
  {
    path: 'auth',
    loadChildren: () => import('./features/auth/auth.routes').then(m => m.AUTH_ROUTES)
  },
  {
    path: 'admin',
    canActivate: [authGuard, adminGuard], // Protection admin
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES)
  }
];

---

## 🧪 Test fonctionnel - Étape 2.2 : Guards de Protection

### **Vérifications à effectuer :**

#### **1. Test du AuthGuard**
```bash
# Aller sur http://localhost:4200/todos (sans être connecté)
```

**✅ Tests à réaliser :**
- [ ] Redirection automatique vers `/auth/login`
- [ ] L'URL de retour est sauvegardée dans les query params
- [ ] Après connexion, retour automatique vers `/todos`

#### **2. Test du AdminGuard**
```bash
# Se connecter avec un compte utilisateur normal
# user@example.com / user123

# Essayer d'accéder à http://localhost:4200/admin
```

**✅ Tests à réaliser :**
- [ ] Redirection vers `/todos` (accès refusé)
- [ ] Se connecter avec `admin@example.com` / `admin123`
- [ ] Accès à `/admin` autorisé

#### **3. Test de la navigation**
- [ ] Cliquer sur "Admin" dans le header (si connecté en tant qu'admin)
- [ ] Vérifier que la navigation fonctionne correctement
- [ ] Tester la déconnexion et vérifier les redirections

**🔧 Debug en cas de problème :**
```bash
# Vérifier les routes dans la console
F12 → Console → Vérifier les logs de navigation

# Vérifier que les guards sont bien appliqués
ng build --configuration development
```
```

### **Explication technique : CanActivateFn vs CanActivate**

#### **🆕 CanActivateFn (Angular 14+)**
- **Functional Guards** : Plus moderne et flexible
- **Injection simplifiée** : Utilise `inject()` au lieu du constructeur
- **Tree-shaking** : Meilleure optimisation du bundle
- **Composition** : Plus facile de combiner plusieurs guards

#### **🔄 Observable vs Promise**
- **Observable** : Permet l'annulation et la réactivité
- **take(1)** : Évite les fuites mémoire en se désabonnant automatiquement
- **map()** : Transforme la valeur sans créer de nouvel Observable

---

## 🔄 Étape 2.3 : Lazy Loading Avancé

### **Pourquoi le Lazy Loading ?**

Le lazy loading améliore significativement les performances :

#### **⚡ Performance**
- **Bundle initial réduit** : Seuls les modules nécessaires sont chargés
- **Chargement à la demande** : Les modules se chargent quand on en a besoin
- **Cache intelligent** : Les modules restent en cache après premier chargement

#### **📱 Expérience mobile**
- **Temps de chargement réduit** : Particulièrement important sur mobile
- **Bande passante économisée** : Seulement ce qui est nécessaire
- **Batterie préservée** : Moins de traitement initial

### **Configuration du lazy loading**

```typescript
// src/app/features/auth/auth.routes.ts
import { Routes } from '@angular/router';
import { LoginComponent } from './components/login.component';
import { RegisterComponent } from './components/register.component';

export const AUTH_ROUTES: Routes = [
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
```

### **Composant Register avec validation avancée**

```typescript
// src/app/features/auth/components/register.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, AbstractControl, ValidationErrors } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

// Validateur personnalisé pour la confirmation de mot de passe
function passwordMatchValidator(control: AbstractControl): ValidationErrors | null {
  const password = control.get('password');
  const confirmPassword = control.get('confirmPassword');
  
  if (password && confirmPassword && password.value !== confirmPassword.value) {
    return { passwordMismatch: true };
  }
  return null;
}

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div class="max-w-md w-full space-y-8">
        <div>
          <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Créer un compte
          </h2>
        </div>
        
        <form [formGroup]="registerForm" (ngSubmit)="onSubmit()" class="mt-8 space-y-6">
          <!-- Nom -->
          <div>
            <label for="name" class="block text-sm font-medium text-gray-700">
              Nom complet
            </label>
            <input
              id="name"
              type="text"
              formControlName="name"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('name')"
            />
            @if (isFieldInvalid('name')) {
              <p class="mt-1 text-sm text-red-600">
                {{ getFieldError('name') }}
              </p>
            }
          </div>

          <!-- Email -->
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700">
              Adresse email
            </label>
            <input
              id="email"
              type="email"
              formControlName="email"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('email')"
            />
            @if (isFieldInvalid('email')) {
              <p class="mt-1 text-sm text-red-600">
                {{ getFieldError('email') }}
              </p>
            }
          </div>

          <!-- Password -->
          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Mot de passe
            </label>
            <input
              id="password"
              type="password"
              formControlName="password"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('password')"
            />
            @if (isFieldInvalid('password')) {
              <p class="mt-1 text-sm text-red-600">
                {{ getFieldError('password') }}
              </p>
            }
          </div>

          <!-- Confirm Password -->
          <div>
            <label for="confirmPassword" class="block text-sm font-medium text-gray-700">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              type="password"
              formControlName="confirmPassword"
              class="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              [class.border-red-500]="isFieldInvalid('confirmPassword')"
            />
            @if (isFieldInvalid('confirmPassword')) {
              <p class="mt-1 text-sm text-red-600">
                {{ getFieldError('confirmPassword') }}
              </p>
            }
          </div>

          <!-- Submit Button -->
          <div>
            <button
              type="submit"
              [disabled]="registerForm.invalid || loading()"
              class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
            >
              @if (loading()) {
                <span class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></span>
                Création en cours...
              } @else {
                Créer le compte
              }
            </button>
          </div>

          <!-- Error Message -->
          @if (error()) {
            <div class="bg-red-50 border border-red-200 rounded-md p-4">
              <p class="text-sm text-red-600">{{ error() }}</p>
            </div>
          }
        </form>
      </div>
    </div>
  `
})
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup;
  loading = signal(false);
  error = signal<string>('');

  constructor() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    }, { validators: passwordMatchValidator });
  }

  onSubmit() {
    if (this.registerForm.valid) {
      this.loading.set(true);
      this.error.set('');

      const { confirmPassword, ...userData } = this.registerForm.value;
      
      this.authService.register(userData).subscribe({
        next: (user) => {
          this.loading.set(false);
          this.router.navigate(['/todos']);
        },
        error: (err) => {
          this.loading.set(false);
          this.error.set(err.message || 'Erreur lors de la création du compte');
        }
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!(field && field.invalid && (field.dirty || field.touched));
  }

  getFieldError(fieldName: string): string {
    const field = this.registerForm.get(fieldName);
    if (field?.errors) {
      if (field.errors['required']) return 'Ce champ est requis';
      if (field.errors['email']) return 'Format d\'email invalide';
      if (field.errors['minlength']) return `Minimum ${field.errors['minlength'].requiredLength} caractères`;
      if (field.errors['passwordMismatch']) return 'Les mots de passe ne correspondent pas';
    }
    return '';
  }
}
```

### **Explication technique : Validateurs personnalisés**

#### **🔧 Validateur personnalisé**
- **Fonction pure** : Pas d'effets de bord, facilement testable
- **Validation croisée** : Peut accéder à plusieurs contrôles
- **Réutilisabilité** : Peut être utilisé dans d'autres formulaires

#### **📊 Validators Angular**
- **Validators.required** : Champ obligatoire
- **Validators.email** : Format email valide
- **Validators.minLength(n)** : Longueur minimale
- **Validators.pattern(regex)** : Expression régulière

---

## 🧪 Test fonctionnel - Étape 2.3 : Lazy Loading et Register

### **Vérifications à effectuer :**

#### **1. Test du formulaire de register**
```bash
# Aller sur http://localhost:4200/auth/register
```

**✅ Tests à réaliser :**
- [ ] Le formulaire s'affiche correctement avec tous les champs
- [ ] Validation du nom (minimum 2 caractères)
- [ ] Validation de l'email (format valide)
- [ ] Validation du mot de passe (minimum 6 caractères)
- [ ] Validation de la confirmation de mot de passe
- [ ] Les mots de passe doivent correspondre
- [ ] Création d'un nouveau compte fonctionne

#### **2. Test du lazy loading**
```bash
# Ouvrir les DevTools (F12)
# Aller dans l'onglet Network
# Naviguer entre les pages
```

**✅ Tests à réaliser :**
- [ ] Chargement initial rapide (pas de gros bundle)
- [ ] Nouveaux chunks chargés lors de la navigation
- [ ] Les modules se chargent à la demande
- [ ] Pas d'erreurs de chargement dans la console

#### **3. Test de la validation croisée**
- [ ] Taper des mots de passe différents → erreur
- [ ] Corriger pour qu'ils correspondent → erreur disparaît
- [ ] Le bouton s'active seulement si tout est valide

**🔧 Debug en cas de problème :**
```bash
# Vérifier les erreurs de compilation
ng build --configuration development

# Vérifier les chunks générés
ng build --stats-json
```

## 🎨 Étape 2.4 : Interface Admin

### **Pourquoi une interface admin ?**

L'interface admin permet de gérer l'application de manière centralisée :

#### **👥 Gestion des utilisateurs**
- **Création/suppression** : Gérer les comptes utilisateurs
- **Attribution de rôles** : Donner des permissions spécifiques
- **Surveillance** : Voir qui utilise l'application

#### **📋 Gestion des tickets**
- **Répartition** : Assigner des tickets aux utilisateurs
- **Suivi** : Voir l'état de tous les tickets
- **Modération** : Supprimer ou modifier des tickets

### **Composant Admin principal**

```typescript
// src/app/features/admin/components/admin.component.ts
import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';
import { TodoService } from '../../todos/services/todo.service';
import { User, Todo } from '../../auth/models/user.model';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900">Interface d'Administration</h1>
        <p class="text-gray-600 mt-2">Gérez les utilisateurs et les tickets</p>
      </div>

      <!-- Navigation Admin -->
      <div class="mb-8">
        <nav class="flex space-x-4">
          <button
            (click)="activeTab = 'users'"
            [class.bg-blue-600]="activeTab === 'users'"
            [class.text-white]="activeTab === 'users'"
            [class.text-gray-700]="activeTab !== 'users'"
            class="px-4 py-2 rounded-md font-medium hover:bg-blue-700 hover:text-white transition-colors"
          >
            Utilisateurs
          </button>
          <button
            (click)="activeTab = 'tickets'"
            [class.bg-blue-600]="activeTab === 'tickets'"
            [class.text-white]="activeTab === 'tickets'"
            [class.text-gray-700]="activeTab !== 'tickets'"
            class="px-4 py-2 rounded-md font-medium hover:bg-blue-700 hover:text-white transition-colors"
          >
            Tickets
          </button>
        </nav>
      </div>

      <!-- Contenu des onglets -->
      @if (activeTab === 'users') {
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Gestion des Utilisateurs</h2>
          </div>
          <div class="p-6">
            @if (users().length > 0) {
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Utilisateur
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Rôle
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    @for (user of users(); track user.id) {
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="flex items-center">
                            <div class="flex-shrink-0 h-10 w-10">
                              <div class="h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center">
                                <span class="text-sm font-medium text-gray-700">
                                  {{ user.name.charAt(0).toUpperCase() }}
                                </span>
                              </div>
                            </div>
                            <div class="ml-4">
                              <div class="text-sm font-medium text-gray-900">{{ user.name }}</div>
                              <div class="text-sm text-gray-500">{{ user.email }}</div>
                            </div>
                          </div>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span
                            [class.bg-red-100]="user.role === 'admin'"
                            [class.text-red-800]="user.role === 'admin'"
                            [class.bg-green-100]="user.role === 'user'"
                            [class.text-green-800]="user.role === 'user'"
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          >
                            {{ user.role | titlecase }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          @if (user.role !== 'admin') {
                            <button
                              (click)="deleteUser(user.id)"
                              class="text-red-600 hover:text-red-900"
                            >
                              Supprimer
                            </button>
                          } @else {
                            <span class="text-gray-400">Admin protégé</span>
                          }
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            } @else {
              <p class="text-gray-500 text-center py-8">Aucun utilisateur trouvé</p>
            }
          </div>
        </div>
      }

      @if (activeTab === 'tickets') {
        <div class="bg-white shadow rounded-lg">
          <div class="px-6 py-4 border-b border-gray-200">
            <h2 class="text-xl font-semibold text-gray-900">Gestion des Tickets</h2>
          </div>
          <div class="p-6">
            @if (todos().length > 0) {
              <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                  <thead class="bg-gray-50">
                    <tr>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ticket
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statut
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Priorité
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Assigné à
                      </th>
                      <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody class="bg-white divide-y divide-gray-200">
                    @for (todo of todos(); track todo.id) {
                      <tr>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <div class="text-sm font-medium text-gray-900">{{ todo.title }}</div>
                          @if (todo.description) {
                            <div class="text-sm text-gray-500">{{ todo.description }}</div>
                          }
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span
                            [class.bg-yellow-100]="todo.status === 'todo'"
                            [class.text-yellow-800]="todo.status === 'todo'"
                            [class.bg-blue-100]="todo.status === 'in-progress'"
                            [class.text-blue-800]="todo.status === 'in-progress'"
                            [class.bg-green-100]="todo.status === 'done'"
                            [class.text-green-800]="todo.status === 'done'"
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          >
                            {{ todo.status | titlecase }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap">
                          <span
                            [class.bg-red-100]="todo.priority === 'high'"
                            [class.text-red-800]="todo.priority === 'high'"
                            [class.bg-yellow-100]="todo.priority === 'medium'"
                            [class.text-yellow-800]="todo.priority === 'medium'"
                            [class.bg-green-100]="todo.priority === 'low'"
                            [class.text-green-800]="todo.priority === 'low'"
                            class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          >
                            {{ todo.priority | titlecase }}
                          </span>
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {{ todo.assignedTo || 'Non assigné' }}
                        </td>
                        <td class="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            (click)="deleteTodo(todo.id)"
                            class="text-red-600 hover:text-red-900 mr-3"
                          >
                            Supprimer
                          </button>
                          <button
                            (click)="assignTodo(todo)"
                            class="text-blue-600 hover:text-blue-900"
                          >
                            Assigner
                          </button>
                        </td>
                      </tr>
                    }
                  </tbody>
                </table>
              </div>
            } @else {
              <p class="text-gray-500 text-center py-8">Aucun ticket trouvé</p>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class AdminComponent implements OnInit {
  private authService = inject(AuthService);
  private todoService = inject(TodoService);
  private router = inject(Router);

  activeTab = signal<'users' | 'tickets'>('users');
  users = signal<User[]>([]);
  todos = signal<Todo[]>([]);

  async ngOnInit() {
    // Vérifier que l'utilisateur est admin
    const currentUser = await this.authService.getCurrentUser();
    if (!currentUser || currentUser.role !== 'admin') {
      this.router.navigate(['/todos']);
      return;
    }

    // Charger les données
    await this.loadUsers();
    await this.loadTodos();
  }

  async loadUsers() {
    try {
      const users = await this.authService.getAllUsers();
      this.users.set(users);
    } catch (error) {
      console.error('Erreur lors du chargement des utilisateurs:', error);
    }
  }

  async loadTodos() {
    try {
      const todos = await this.todoService.getAllTodos();
      this.todos.set(todos);
    } catch (error) {
      console.error('Erreur lors du chargement des todos:', error);
    }
  }

  async deleteUser(userId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
      try {
        await this.authService.deleteUser(userId);
        await this.loadUsers();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  }

  async deleteTodo(todoId: number) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce ticket ?')) {
      try {
        await this.todoService.deleteTodo(todoId);
        await this.loadTodos();
      } catch (error) {
        console.error('Erreur lors de la suppression:', error);
      }
    }
  }

  assignTodo(todo: Todo) {
    // TODO: Implémenter la logique d'assignation
    console.log('Assigner le ticket:', todo);
  }
}

---

## 🧪 Test fonctionnel - Étape 2.4 : Interface Admin

### **Vérifications à effectuer :**

#### **1. Test de l'accès admin**
```bash
# Se connecter en tant qu'admin
# admin@example.com / admin123

# Aller sur http://localhost:4200/admin
```

**✅ Tests à réaliser :**
- [ ] L'interface admin s'affiche correctement
- [ ] Les onglets "Utilisateurs" et "Tickets" sont présents
- [ ] La liste des utilisateurs s'affiche
- [ ] La liste des tickets s'affiche
- [ ] Les rôles sont correctement affichés (Admin/User)

#### **2. Test de la gestion des utilisateurs**
- [ ] Voir tous les utilisateurs dans le tableau
- [ ] Les admins sont marqués comme "protégés"
- [ ] Possibilité de supprimer un utilisateur normal
- [ ] Confirmation avant suppression

#### **3. Test de la gestion des tickets**
- [ ] Voir tous les tickets dans le tableau
- [ ] Les statuts sont correctement affichés (Todo, In Progress, Done)
- [ ] Les priorités sont correctement affichées (High, Medium, Low)
- [ ] Possibilité de supprimer un ticket
- [ ] Bouton "Assigner" présent (fonctionnalité à implémenter)

#### **4. Test de la navigation**
- [ ] Changement d'onglet fonctionne
- [ ] Les données se rechargent correctement
- [ ] Pas d'erreurs dans la console

**🔧 Debug en cas de problème :**
```bash
# Vérifier les permissions
F12 → Console → Vérifier les logs d'authentification

# Vérifier les données
F12 → Application → Local Storage → Vérifier le token
```
```

### **Explication technique : Signals vs Observables**

#### **📡 Signals (Angular 20+)**
- **Performance optimale** : Détection de changements ultra-rapide
- **Syntaxe simplifiée** : `signal()` et `computed()` plus intuitifs
- **Tree-shaking** : Meilleure optimisation du bundle
- **Réactivité granulaire** : Seuls les composants qui utilisent le signal se mettent à jour

#### **🔄 Observables (RxJS)**
- **Puissance** : Opérateurs avancés (map, filter, switchMap, etc.)
- **Annulation** : Possibilité d'annuler les requêtes
- **Composition** : Combinaison de plusieurs streams
- **Maturité** : Écosystème riche et stable

#### **🎯 Quand utiliser quoi ?**
- **Signals** : État local simple, performance critique
- **Observables** : Requêtes HTTP, événements complexes, composition de streams

---

## 🔧 Étape 2.5 : Intercepteurs HTTP

### **Pourquoi les Intercepteurs ?**

Les intercepteurs permettent de traiter toutes les requêtes HTTP de manière centralisée :

#### **🔐 Authentification**
- **Ajout automatique des tokens** : Pas besoin de les ajouter manuellement
- **Gestion des erreurs 401** : Redirection automatique vers login
- **Refresh des tokens** : Renouvellement transparent

#### **📊 Monitoring**
- **Logs centralisés** : Toutes les requêtes sont loggées
- **Métriques** : Temps de réponse, taux d'erreur
- **Debugging** : Facilite le débogage des problèmes réseau

### **Création de l'intercepteur d'authentification**

```typescript
// src/app/core/interceptors/auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import { AuthService } from '../../features/auth/services/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    // Ajouter le token d'authentification si disponible
    const token = this.authService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expiré ou invalide
          this.authService.logout();
          this.router.navigate(['/auth/login']);
        }
        return throwError(() => error);
      })
    );
  }
}
```

### **Configuration de l'intercepteur**

```typescript
// src/app/app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(
      withInterceptors([authInterceptor])
    )
  ]
};
```

### **Explication technique : Intercepteurs vs Middleware**

#### **🔧 Intercepteurs Angular**
- **Côté client** : Exécutés dans le navigateur
- **Modification des requêtes** : Ajout d'headers, transformation du body
- **Gestion des réponses** : Transformation des données, gestion d'erreurs
- **Chaînage** : Plusieurs intercepteurs peuvent s'enchaîner

#### **🔄 Ordre d'exécution**
1. **Intercepteurs sortants** : Modifient les requêtes avant envoi
2. **Requête HTTP** : Envoi au serveur
3. **Intercepteurs entrants** : Traitent la réponse
4. **Composant** : Reçoit les données finales

---

## 🧪 Test fonctionnel - Étape 2.5 : Intercepteurs HTTP

### **Vérifications à effectuer :**

#### **1. Test de l'intercepteur d'authentification**
```bash
# Ouvrir les DevTools (F12)
# Aller dans l'onglet Network
# Se connecter à l'application
```

**✅ Tests à réaliser :**
- [ ] Les requêtes HTTP incluent le header `Authorization: Bearer <token>`
- [ ] Le token est automatiquement ajouté aux requêtes
- [ ] Pas d'erreur 401 lors des requêtes authentifiées

#### **2. Test de la gestion des erreurs 401**
```bash
# Simuler une erreur 401 (token expiré)
# Modifier le token dans le localStorage pour le rendre invalide
```

**✅ Tests à réaliser :**
- [ ] Redirection automatique vers `/auth/login` en cas d'erreur 401
- [ ] Le token invalide est supprimé
- [ ] L'utilisateur est déconnecté automatiquement

#### **3. Test des requêtes non authentifiées**
- [ ] Les requêtes vers `/auth/*` ne doivent pas avoir de token
- [ ] Pas d'erreur pour les routes publiques
- [ ] Les requêtes vers les API protégées incluent le token

**🔧 Debug en cas de problème :**
```bash
# Vérifier les headers des requêtes
F12 → Network → Cliquer sur une requête → Headers

# Vérifier le token dans le localStorage
F12 → Application → Local Storage → Vérifier le token

# Vérifier les logs de l'intercepteur
F12 → Console → Vérifier les logs d'interception
```

---

## 🧪 Test fonctionnel - Validation complète de la Partie 2

### **Test d'intégration global**

#### **1. Parcours utilisateur complet**
```bash
# Test complet de l'application
```

**✅ Scénario à tester :**
1. [ ] Aller sur `/auth/register` et créer un nouveau compte
2. [ ] Se connecter avec le nouveau compte
3. [ ] Naviguer vers `/todos` et créer quelques tickets
4. [ ] Changer le statut des tickets
5. [ ] Se déconnecter et se reconnecter
6. [ ] Vérifier que les données persistent

#### **2. Parcours admin complet**
```bash
# Test de l'interface admin
```

**✅ Scénario à tester :**
1. [ ] Se connecter en tant qu'admin
2. [ ] Aller sur `/admin`
3. [ ] Voir la liste des utilisateurs et tickets
4. [ ] Supprimer un ticket
5. [ ] Supprimer un utilisateur (non admin)
6. [ ] Vérifier que les suppressions fonctionnent

#### **3. Test de sécurité**
- [ ] Essayer d'accéder à `/admin` sans être admin → redirection
- [ ] Essayer d'accéder à `/todos` sans être connecté → redirection
- [ ] Vérifier que les guards fonctionnent correctement

#### **4. Test des intercepteurs HTTP**
- [ ] Vérifier les logs dans la console lors des requêtes
- [ ] Tester les notifications toast (login, logout, erreurs)
- [ ] Vérifier que les tokens sont ajoutés aux headers
- [ ] Tester la gestion des erreurs 401/403/500

#### **5. Test de performance**
- [ ] Chargement initial rapide
- [ ] Navigation fluide entre les pages
- [ ] Lazy loading fonctionne
- [ ] Pas de fuites mémoire

**🎯 Critères de réussite :**
- ✅ Tous les formulaires fonctionnent avec validation
- ✅ L'authentification est sécurisée avec tokens JWT
- ✅ Les guards protègent les routes efficacement
- ✅ L'interface admin est complète avec statistiques
- ✅ Les intercepteurs gèrent les tokens et erreurs
- ✅ Système de notifications fonctionnel
- ✅ Pas d'erreurs dans la console
- ✅ Performance satisfaisante

---

## 🎯 État actuel de l'application

### **Fonctionnalités implémentées :**
- ✅ **Authentification complète** : Login/Register avec validation
- ✅ **Formulaires réactifs** : Validation en temps réel, gestion d'erreurs
- ✅ **Guards de protection** : AuthGuard et AdminGuard
- ✅ **Lazy loading** : Chargement à la demande des modules
- ✅ **Interface admin avancée** : Gestion des utilisateurs et tickets avec statistiques
- ✅ **Intercepteurs HTTP** : Gestion centralisée des requêtes et authentification
- ✅ **Validation avancée** : Validateurs personnalisés et gestion d'erreurs
- ✅ **Système de notifications** : Toast notifications avec ErrorService
- ✅ **Gestion des tokens JWT** : Authentification automatique avec intercepteurs

### **Concepts maîtrisés :**
- **ReactiveFormsModule** : FormBuilder, FormGroup, FormControl
- **Validators** : Built-in et personnalisés (passwordMatchValidator)
- **Route Guards** : CanActivateFn, protection des routes
- **Lazy Loading** : Performance et organisation du code
- **Interceptors HTTP** : Gestion centralisée des requêtes et authentification
- **Signals** : État réactif moderne d'Angular 20+
- **ErrorService** : Gestion centralisée des erreurs et notifications
- **Toast Notifications** : Interface utilisateur pour les feedbacks

### **Prêt pour la Partie 3 :**
- ✅ Formulaires complexes et validation avancée
- ✅ Gestion d'état avec Signals
- ✅ Services avec cache et optimisation
- ✅ Tests unitaires et d'intégration

---

*💡 **Conseil du mentor :** Les formulaires réactifs sont plus puissants que les formulaires template-driven. Prenez le temps de comprendre la différence et quand utiliser chacun. Les Guards et Intercepteurs sont essentiels pour la sécurité de vos applications.*

*🔧 **Conseil qualité :** La validation des formulaires est cruciale pour l'expérience utilisateur. Utilisez des validateurs personnalisés pour des règles métier complexes. Les Guards protègent votre application des accès non autorisés.*

*⚡ **Conseil ESLint :** Respectez toujours les règles de linting. Utilisez `inject()` au lieu de l'injection par constructeur, évitez les variables inutilisées, et préférez `console.warn`/`console.error` à `console.log`. Un code propre est plus maintenable.*

---

## 🚀 Préparation pour la Partie 3

### **Objectifs de la Partie 3 :**
- 🎨 **Composants réutilisables** : Création de composants génériques
- 🔄 **Gestion d'état avancée** : Services avec cache, optimisation
- 🧪 **Tests unitaires** : Tests des composants et services
- 📱 **Responsive design** : Interface adaptative
- 🎯 **Performance** : Optimisation et lazy loading avancé

### **Concepts à maîtriser :**
- **Composants standalone** : Architecture moderne d'Angular
- **Services avec cache** : Optimisation des performances
- **Tests unitaires** : Jasmine et TestBed
- **Responsive design** : Tailwind CSS avancé
- **Performance** : OnPush strategy, trackBy functions

### **Prérequis validés :**
- ✅ Authentification et autorisation
- ✅ Formulaires réactifs avec validation
- ✅ Guards et intercepteurs
- ✅ Interface admin fonctionnelle
- ✅ Architecture DDD solide

---

*🎯 **Prêt pour la Partie 3 !** Votre application a maintenant une authentification complète et des formulaires robustes. Dans la Partie 3, nous nous concentrerons sur la création de composants réutilisables et l'optimisation des performances.*


# Partie 3 : Gestion d'État Avancée et Composants Personnalisés

## 🎯 Objectifs de la Partie 3

À la fin de cette partie, vous serez capable de :
- ✅ Maîtriser la gestion d'état avec Signals (avantages vs anciennes méthodes)
- ✅ Créer des pipes personnalisés pour la transformation de données
- ✅ Développer des directives personnalisées
- ✅ Implémenter une communication avancée entre composants
- ✅ Optimiser les performances avec les nouvelles fonctionnalités Angular 20+

---

## 🔄 Étape 3.1 : Gestion d'État Avancée avec Signals

### **Pourquoi les Signals sont révolutionnaires ?**

Les Signals d'Angular 20+ représentent une **révolution** dans la gestion d'état par rapport aux anciennes méthodes :

#### **🔄 Comparaison avec les anciennes méthodes :**

**❌ Ancienne méthode (BehaviorSubject/Observable) :**
```typescript
// Service avec BehaviorSubject
export class TodoService {
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  public todos$ = this.todosSubject.asObservable();

  addTodo(todo: Todo) {
    const currentTodos = this.todosSubject.value;
    this.todosSubject.next([...currentTodos, todo]);
  }
}

// Composant avec Observable
export class TodoListComponent {
  todos$ = this.todoService.todos$;

  constructor(private todoService: TodoService) {}

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo);
  }
}
```

**✅ Nouvelle méthode (Signals) :**
```typescript
// Service avec Signals
export class TodoService {
  private todos = signal<Todo[]>([]);
  public todos = this.todos.asReadonly();

  addTodo(todo: Todo) {
    this.todos.update(todos => [...todos, todo]);
  }
}

// Composant avec Signals
export class TodoListComponent {
  todos = this.todoService.todos;

  constructor(private todoService: TodoService) {}

  addTodo(todo: Todo) {
    this.todoService.addTodo(todo);
  }
}
```

#### **🚀 Avantages des Signals :**

1. **⚡ Performance supérieure** :
   - Détection de changements granulaire
   - Pas de cycle de détection complet
   - Mise à jour uniquement des composants concernés

2. **🧠 Simplicité d'utilisation** :
   - Pas de `subscribe()`/`unsubscribe()`
   - Pas de gestion de la mémoire
   - Syntaxe plus intuitive

3. **🔒 Type safety** :
   - Typage strict par défaut
   - Moins d'erreurs runtime
   - Meilleur support IDE

4. **🔄 Réactivité automatique** :
   - Mise à jour automatique du template
   - Pas d'`async` pipe nécessaire
   - Gestion automatique du cycle de vie

### **Implémentation des Signals avancés**

#### **1. Signal computed (dérivé)
```typescript
export class TodoService {
  private todos = signal<Todo[]>([]);
  
  // Signal computed - se recalcule automatiquement
  public completedTodos = computed(() => 
    this.todos().filter(todo => todo.status === 'done')
  );
  
  public pendingTodos = computed(() => 
    this.todos().filter(todo => todo.status === 'todo')
  );

  public inProgressTodos = computed(() => 
    this.todos().filter(todo => todo.status === 'in-progress')
  );
  
  public highPriorityTodos = computed(() => 
    this.todos().filter(todo => todo.priority === 'high')
  );
  
  public todoStats = computed(() => ({
    total: this.todos().length,
    completed: this.completedTodos().length,
    inProgress: this.inProgressTodos().length,
    pending: this.pendingTodos().length,
    highPriority: this.highPriorityTodos().length,
    completionRate: this.todos().length > 0 
      ? (this.completedTodos().length / this.todos().length) * 100 
      : 0
  }));
}
```

**🔧 Correction importante :** Nous avons séparé les computed signals par statut exact pour éviter les doublons entre les colonnes Kanban.

#### **2. Signal writable avec validation**
```typescript
export class UserService {
  private currentUser = signal<User | null>(null);
  
  // Signal avec validation
  public isAdmin = computed(() => 
    this.currentUser()?.role === 'admin'
  );
  
  public canEditTodos = computed(() => 
    this.currentUser() && (this.isAdmin() || this.currentUser()?.role === 'user')
  );
}
```

#### **3. Signal avec effets**
```typescript
export class TodoService {
  private todos = signal<Todo[]>([]);
  
  constructor() {
    // Effet qui se déclenche automatiquement
    effect(() => {
      const todos = this.todos();
      console.warn(`Todos mis à jour: ${todos.length} todos`);
      
      // Sauvegarder dans localStorage
      localStorage.setItem('todos', JSON.stringify(todos));
    });
  }
}
```

---

## 🎨 Étape 3.2 : Pipes Personnalisés

### **Pourquoi créer des pipes personnalisés ?**

Les pipes permettent de **transformer les données** dans le template sans modifier la logique du composant. Ils sont :
- **Réutilisables** : Un pipe peut être utilisé dans plusieurs composants
- **Performants** : Mise en cache automatique des résultats
- **Testables** : Logique pure, facile à tester
- **Maintenables** : Séparation claire entre logique et présentation

### **Création de pipes personnalisés**

#### **1. Pipe de formatage de priorité - IMPLÉMENTÉ**
```typescript
// src/app/shared/pipes/priority.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priority',
  standalone: true
})
export class PriorityPipe implements PipeTransform {
  transform(priority: 'low' | 'medium' | 'high'): string {
    const priorityMap = {
      low: 'Faible',
      medium: 'Moyenne',
      high: 'Haute'
    };
    
    return priorityMap[priority] || priority;
  }
}
```

#### **2. Pipe de formatage de durée - IMPLÉMENTÉ**
```typescript
// src/app/shared/pipes/duration.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
  standalone: true
})
export class DurationPipe implements PipeTransform {
  transform(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    
    return `${hours}h ${remainingMinutes}min`;
  }
}
```

### **Utilisation des pipes dans les templates**
```html
<!-- Formatage de priorité -->
<span 
  class="px-2 py-1 text-xs font-semibold rounded-full"
  [class.bg-red-100]="todo.priority === 'high'"
  [class.text-red-800]="todo.priority === 'high'"
  [class.bg-yellow-100]="todo.priority === 'medium'"
  [class.text-yellow-800]="todo.priority === 'medium'"
  [class.bg-green-100]="todo.priority === 'low'"
  [class.text-green-800]="todo.priority === 'low'"
>
  {{ todo.priority | priority }}
</span>
```

---

## 🎛️ Étape 3.3 : Directives Personnalisées

### **Pourquoi créer des directives personnalisées ?**

Les directives permettent d'**étendre le comportement HTML** et de créer des **composants réutilisables** :
- **Réutilisabilité** : Une directive peut être appliquée à n'importe quel élément
- **Encapsulation** : Logique métier isolée
- **Performance** : Moins de composants = moins de surcharge
- **Flexibilité** : Comportement dynamique selon les paramètres

### **Création de directives personnalisées**

#### **1. Directive de highlight - IMPLÉMENTÉ**
```typescript
// src/app/shared/directives/highlight.directive.ts
import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appHighlight]',
  standalone: true
})
export class HighlightDirective implements OnInit {
  @Input() appHighlight: string = 'yellow';
  @Input() appHighlightDelay: number = 0;

  constructor(
    private el: ElementRef,
    private renderer: Renderer2
  ) {}

  ngOnInit() {
    setTimeout(() => {
      this.renderer.setStyle(
        this.el.nativeElement,
        'background-color',
        this.appHighlight
      );
    }, this.appHighlightDelay);
  }
}
```

### **Utilisation des directives dans les templates**
```html
<!-- Highlight avec priorité -->
<div 
  class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400"
  [appHighlight]="todo.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'transparent'"
  [appHighlightDelay]="todo.priority === 'high' ? 500 : 0"
>
  <!-- Contenu du todo -->
</div>
```

---

## 🔗 Étape 3.4 : Communication Avancée entre Composants

### **Patterns de communication**

#### **1. Service partagé avec Signals - IMPLÉMENTÉ**
```typescript
// src/app/shared/services/error.service.ts
import { Injectable, signal } from '@angular/core';

export interface ErrorNotification {
  id: string;
  message: string;
  type: 'error' | 'warning' | 'info';
  timestamp: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errors = signal<ErrorNotification[]>([]);
  public errors$ = this.errors.asReadonly();

  showError(message: string) {
    this.addNotification(message, 'error');
  }

  showWarning(message: string) {
    this.addNotification(message, 'warning');
  }

  showInfo(message: string) {
    this.addNotification(message, 'info');
  }

  private addNotification(message: string, type: 'error' | 'warning' | 'info') {
    const notification: ErrorNotification = {
      id: this.generateId(),
      message,
      type,
      timestamp: new Date()
    };

    this.errors.update(errors => [...errors, notification]);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      this.removeError(notification.id);
    }, 5000);
  }

  removeError(id: string) {
    this.errors.update(errors => errors.filter(error => error.id !== id));
  }

  clearAll() {
    this.errors.set([]);
  }

  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
```

#### **2. Composant de notification global - IMPLÉMENTÉ**
```typescript
// src/app/shared/components/notifications/notifications.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      @for (notification of errorService.errors$(); track notification.id) {
        <div 
          class="w-fit max-w-md p-4 rounded-lg shadow-lg text-white flex items-center justify-between"
          [class]="{
            'bg-red-500': notification.type === 'error',
            'bg-yellow-500': notification.type === 'warning',
            'bg-blue-500': notification.type === 'info'
          }"
        >
          <div class="flex items-center space-x-2">
            <!-- Icône selon le type -->
            @if (notification.type === 'error') {
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
              </svg>
            }
            @if (notification.type === 'warning') {
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"></path>
              </svg>
            }
            @if (notification.type === 'info') {
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd"></path>
              </svg>
            }
            <span>{{ notification.message }}</span>
          </div>
          <button 
            (click)="errorService.removeError(notification.id)"
            class="ml-4 text-white hover:text-gray-200"
          >
            ×
          </button>
        </div>
      }
    </div>
  `
})
export class NotificationsComponent {
  errorService = inject(ErrorService);
}
```

---

## 🎯 Étape 3.5 : Amélioration du composant TodoList

### **Intégration des Signals avancés**

#### **1. Utilisation des computed signals dans le template**
```typescript
// src/app/features/todos/components/todo-list.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TodoService } from '../services/todo.service';
import { PriorityPipe } from '../../../shared/pipes/priority.pipe';
import { HighlightDirective } from '../../../shared/directives/highlight.directive';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, PriorityPipe, HighlightDirective],
  template: `
    <!-- Dashboard des statistiques -->
    <div class="mb-8">
      <h2 class="text-2xl font-bold text-gray-900 mb-4">Statistiques en temps réel</h2>
      <div class="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">Total</h3>
          <p class="text-2xl font-bold text-gray-900">{{ todoService.todoStats().total }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">Complétés</h3>
          <p class="text-2xl font-bold text-green-600">{{ todoService.todoStats().completed }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">En cours</h3>
          <p class="text-2xl font-bold text-blue-600">{{ todoService.todoStats().inProgress }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">Priorité haute</h3>
          <p class="text-2xl font-bold text-red-600">{{ todoService.todoStats().highPriority }}</p>
        </div>
        <div class="bg-white p-4 rounded-lg shadow">
          <h3 class="text-sm font-medium text-gray-500">Taux de complétion</h3>
          <p class="text-2xl font-bold text-purple-600">{{ todoService.todoStats().completionRate | number:'1.0-0' }}%</p>
        </div>
      </div>
    </div>

    <!-- Colonnes Kanban -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <!-- À faire -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          À faire
          <span class="text-sm text-gray-500">({{ todoService.pendingTodos().length }})</span>
        </h3>
        <div class="space-y-3">
          @for (todo of todoService.pendingTodos(); track todo.id) {
            <div 
              class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-gray-400"
              [appHighlight]="todo.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'transparent'"
              [appHighlightDelay]="todo.priority === 'high' ? 500 : 0"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-gray-900">{{ todo.title }}</h4>
                <span 
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                  [class.bg-red-100]="todo.priority === 'high'"
                  [class.text-red-800]="todo.priority === 'high'"
                  [class.bg-yellow-100]="todo.priority === 'medium'"
                  [class.text-yellow-800]="todo.priority === 'medium'"
                  [class.bg-green-100]="todo.priority === 'low'"
                  [class.text-green-800]="todo.priority === 'low'"
                >
                  {{ todo.priority | priority }}
                </span>
              </div>
              @if (todo.description) {
                <p class="text-sm text-gray-600 mb-3">{{ todo.description }}</p>
              }
              <div class="flex justify-between items-center text-xs text-gray-500">
                <span>Créé le {{ todo.createdAt | date:'dd/MM/yyyy' }}</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- En cours -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          En cours
          <span class="text-sm text-gray-500">({{ todoService.inProgressTodos().length }})</span>
        </h3>
        <div class="space-y-3">
          @for (todo of todoService.inProgressTodos(); track todo.id) {
            <div 
              class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-blue-400"
              [appHighlight]="todo.priority === 'high' ? 'rgba(239, 68, 68, 0.1)' : 'transparent'"
              [appHighlightDelay]="todo.priority === 'high' ? 500 : 0"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-gray-900">{{ todo.title }}</h4>
                <span 
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                  [class.bg-red-100]="todo.priority === 'high'"
                  [class.text-red-800]="todo.priority === 'high'"
                  [class.bg-yellow-100]="todo.priority === 'medium'"
                  [class.text-yellow-800]="todo.priority === 'medium'"
                  [class.bg-green-100]="todo.priority === 'low'"
                  [class.text-green-800]="todo.priority === 'low'"
                >
                  {{ todo.priority | priority }}
                </span>
              </div>
              @if (todo.description) {
                <p class="text-sm text-gray-600 mb-3">{{ todo.description }}</p>
              }
              <div class="flex justify-between items-center text-xs text-gray-500">
                <span>Mis à jour le {{ todo.updatedAt | date:'dd/MM/yyyy' }}</span>
              </div>
            </div>
          }
        </div>
      </div>

      <!-- Terminé -->
      <div class="bg-gray-50 rounded-lg p-4">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">
          Terminé
          <span class="text-sm text-gray-500">({{ todoService.completedTodos().length }})</span>
        </h3>
        <div class="space-y-3">
          @for (todo of todoService.completedTodos(); track todo.id) {
            <div 
              class="bg-white p-4 rounded-lg shadow-sm border-l-4 border-green-400"
              [appHighlight]="todo.priority === 'high' ? 'rgba(34, 197, 94, 0.1)' : 'transparent'"
              [appHighlightDelay]="todo.priority === 'high' ? 500 : 0"
            >
              <div class="flex justify-between items-start mb-2">
                <h4 class="font-medium text-gray-900 line-through">{{ todo.title }}</h4>
                <span 
                  class="px-2 py-1 text-xs font-semibold rounded-full"
                  [class.bg-red-100]="todo.priority === 'high'"
                  [class.text-red-800]="todo.priority === 'high'"
                  [class.bg-yellow-100]="todo.priority === 'medium'"
                  [class.text-yellow-800]="todo.priority === 'medium'"
                  [class.bg-green-100]="todo.priority === 'low'"
                  [class.text-green-800]="todo.priority === 'low'"
                >
                  {{ todo.priority | priority }}
                </span>
              </div>
              @if (todo.description) {
                <p class="text-sm text-gray-600 mb-3 line-through">{{ todo.description }}</p>
              }
              <div class="flex justify-between items-center text-xs text-gray-500">
                <span>Terminé le {{ todo.updatedAt | date:'dd/MM/yyyy' }}</span>
              </div>
            </div>
          }
        </div>
      </div>
    </div>
  `
})
export class TodoListComponent {
  todoService = inject(TodoService);
}
```

**🔧 Corrections importantes apportées :**
- ✅ **Logique des computed signals** : Séparation par statut exact (`todo`, `in-progress`, `done`)
- ✅ **Suppression des doublons** : Chaque todo n'apparaît que dans sa colonne correspondante
- ✅ **Performance optimisée** : Utilisation directe des computed signals dans le template
- ✅ **Intégration des pipes et directives** : `PriorityPipe` et `HighlightDirective` intégrés

---

## 🧪 Tests des composants personnalisés

### **Test d'un pipe personnalisé**
```typescript
// src/app/shared/pipes/priority.pipe.spec.ts
import { PriorityPipe } from './priority.pipe';

describe('PriorityPipe', () => {
  let pipe: PriorityPipe;

  beforeEach(() => {
    pipe = new PriorityPipe();
  });

  it('should translate priority values correctly', () => {
    expect(pipe.transform('low')).toBe('Faible');
    expect(pipe.transform('medium')).toBe('Moyenne');
    expect(pipe.transform('high')).toBe('Haute');
  });

  it('should return original value for unknown priority', () => {
    expect(pipe.transform('unknown' as any)).toBe('unknown');
  });
});
```

### **Test d'une directive personnalisée**
```typescript
// src/app/shared/directives/highlight.directive.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HighlightDirective } from './highlight.directive';
import { Component } from '@angular/core';

@Component({
  template: '<div [appHighlight]="color" [appHighlightDelay]="delay">Test</div>'
})
class TestComponent {
  color = 'yellow';
  delay = 0;
}

describe('HighlightDirective', () => {
  let component: TestComponent;
  let fixture: ComponentFixture<TestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HighlightDirective, TestComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(TestComponent);
    component = fixture.componentInstance;
  });

  it('should apply highlight color', () => {
    component.color = 'red';
    fixture.detectChanges();
    
    const element = fixture.nativeElement.querySelector('div');
    expect(element.style.backgroundColor).toBe('red');
  });
});
```

---

## 🎯 État actuel de l'application

### **Fonctionnalités implémentées :**
- ✅ **Gestion d'état avancée** : Signals avec computed et effects
- ✅ **Pipes personnalisés** : Formatage et transformation de données
- ✅ **Directives personnalisées** : Comportements réutilisables
- ✅ **Communication avancée** : Service de notification global
- ✅ **Dashboard en temps réel** : Statistiques automatiques avec Signals
- ✅ **Colonnes Kanban optimisées** : Pas de doublons, filtrage précis

### **Concepts maîtrisés :**
- **Signals avancés** : computed, effects, writable signals
- **Pipes personnalisés** : Transformation de données dans les templates
- **Directives personnalisées** : Extension du comportement HTML
- **Communication entre composants** : Services partagés avec Signals
- **Performance optimisée** : Utilisation des computed signals pour éviter les recalculs

### **Corrections apportées :**
- 🔧 **Logique des computed signals** : Filtrage par statut exact pour éviter les doublons
- 🔧 **Performance** : Utilisation directe des computed signals dans le template
- 🔧 **Intégration** : Pipes et directives correctement intégrés

### **Prêt pour la Partie 4 :**
- ✅ Gestion d'état moderne avec Signals
- ✅ Composants réutilisables (pipes, directives)
- ✅ Communication avancée entre composants
- ✅ Performance optimisée avec computed signals

---

*💡 **Conseil du mentor :** Les Signals représentent l'avenir d'Angular. Prenez le temps de bien comprendre leurs avantages par rapport aux Observables. Les pipes et directives personnalisés vous permettront de créer des composants très réutilisables.*

*🔧 **Conseil qualité :** Créez toujours des tests pour vos pipes et directives personnalisés. Ils sont plus faciles à tester que les composants car ils ont moins de dépendances.*

---

## 🚀 Préparation pour la Partie 4

### **Objectifs de la Partie 4 :**
- 🧪 **Tests complets** : Tests unitaires, d'intégration et e2e
- ⚡ **Optimisations de performance** : OnPush strategy, trackBy, lazy loading
- 🚀 **Déploiement** : Build de production, déploiement sur différents plateformes
- 📋 **Bonnes pratiques** : Code review, refactoring, documentation

### **Concepts à maîtriser :**
- **Tests Angular** : Jasmine, TestBed, ComponentFixture
- **Performance** : ChangeDetectionStrategy, OnPush, trackBy
- **Build et déploiement** : Angular CLI, environnement de production
- **Bonnes pratiques** : Code review, refactoring, documentation

### **Prérequis validés :**
- ✅ Gestion d'état moderne avec Signals
- ✅ Composants personnalisés (pipes, directives)
- ✅ Communication avancée entre composants
- ✅ Architecture DDD solide
- ✅ Performance optimisée avec computed signals

---

*🎯 **Prêt pour la Partie 4 !** Votre application a maintenant une gestion d'état moderne et des composants personnalisés robustes. Dans la Partie 4, nous nous concentrerons sur les tests, les optimisations de performance et le déploiement.*

# Partie 4 : Tests, Performance et Déploiement

## 🎯 Objectifs de la Partie 4

À la fin de cette partie, vous serez capable de :
- ✅ Écrire des tests unitaires, d'intégration et e2e avec Angular
- ✅ Optimiser les performances avec OnPush strategy, trackBy, lazy loading
- ✅ Configurer et déployer une application Angular en production
- ✅ Appliquer les bonnes pratiques de code review et refactoring

---

## 🧪 Étape 4.1 : Tests Unitaires et d'Intégration

### **Pourquoi les tests sont essentiels ?**

Les tests garantissent la **qualité du code** et la **fiabilité de l'application** :
- **🔍 Détection précoce des bugs** : Problèmes identifiés avant la production
- **🛡️ Refactoring sécurisé** : Modifications sans casser les fonctionnalités existantes
- **📚 Documentation vivante** : Les tests expliquent le comportement attendu
- **🚀 Confiance en déploiement** : Déploiement automatique avec tests automatisés

### **Types de tests Angular**

#### **1. Tests unitaires (Unit Tests)**
Testent une **fonction ou classe isolée** :
```typescript
// Test d'un service
describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should create', () => {
    expect(service).toBeTruthy();
  });

  it('should add todo correctly', () => {
    const todo = { id: '1', title: 'Test', status: 'todo' };
    service.addTodo(todo);
    expect(service.todos().length).toBe(1);
  });
});
```

#### **2. Tests d'intégration (Integration Tests)**
Testent l'**interaction entre composants** :
```typescript
// Test d'un composant avec ses dépendances
describe('TodoListComponent', () => {
  let component: TodoListComponent;
  let fixture: ComponentFixture<TodoListComponent>;
  let todoService: jasmine.SpyObj<TodoService>;

  beforeEach(async () => {
    const spy = jasmine.createSpyObj('TodoService', ['getAllTodos']);
    spy.getAllTodos.and.returnValue(of([]));

    await TestBed.configureTestingModule({
      imports: [TodoListComponent],
      providers: [{ provide: TodoService, useValue: spy }]
    }).compileComponents();

    fixture = TestBed.createComponent(TodoListComponent);
    component = fixture.componentInstance;
    todoService = TestBed.inject(TodoService) as jasmine.SpyObj<TodoService>;
  });

  it('should load todos on init', () => {
    fixture.detectChanges();
    expect(todoService.getAllTodos).toHaveBeenCalled();
  });
});
```

### **Tests des composants personnalisés**

#### **1. Test du PriorityPipe**
```typescript
// src/app/shared/pipes/priority.pipe.spec.ts
import { PriorityPipe } from './priority.pipe';

describe('PriorityPipe', () => {
  let pipe: PriorityPipe;

  beforeEach(() => {
    pipe = new PriorityPipe();
  });

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should translate low priority to "Faible"', () => {
    expect(pipe.transform('low')).toBe('Faible');
  });

  it('should translate medium priority to "Moyenne"', () => {
    expect(pipe.transform('medium')).toBe('Moyenne');
  });

  it('should translate high priority to "Haute"', () => {
    expect(pipe.transform('high')).toBe('Haute');
  });

  it('should return original value for unknown priority', () => {
    expect(pipe.transform('unknown' as any)).toBe('unknown');
  });
});
```

#### **2. Test du TodoService avec Signals**
```typescript
// src/app/features/todos/services/todo.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { TodoService } from './todo.service';
import { Todo } from '../models/todo.model';

describe('TodoService', () => {
  let service: TodoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with empty todos', () => {
    expect(service.todos().length).toBe(0);
  });

  it('should add todo correctly', () => {
    const todo: Todo = {
      id: '1',
      title: 'Test Todo',
      description: 'Test Description',
      status: 'todo',
      priority: 'medium',
      createdAt: new Date(),
      updatedAt: new Date()
    };

    service.addTodo(todo);
    expect(service.todos().length).toBe(1);
    expect(service.todos()[0]).toEqual(todo);
  });

  it('should compute completed todos correctly', () => {
    const todo1: Todo = { id: '1', title: 'Todo 1', status: 'done', priority: 'low', createdAt: new Date(), updatedAt: new Date() };
    const todo2: Todo = { id: '2', title: 'Todo 2', status: 'todo', priority: 'medium', createdAt: new Date(), updatedAt: new Date() };

    service.addTodo(todo1);
    service.addTodo(todo2);

    expect(service.completedTodos().length).toBe(1);
    expect(service.completedTodos()[0].id).toBe('1');
  });

  it('should compute pending todos correctly', () => {
    const todo1: Todo = { id: '1', title: 'Todo 1', status: 'todo', priority: 'low', createdAt: new Date(), updatedAt: new Date() };
    const todo2: Todo = { id: '2', title: 'Todo 2', status: 'in-progress', priority: 'medium', createdAt: new Date(), updatedAt: new Date() };

    service.addTodo(todo1);
    service.addTodo(todo2);

    expect(service.pendingTodos().length).toBe(1);
    expect(service.pendingTodos()[0].id).toBe('1');
  });

  it('should compute in-progress todos correctly', () => {
    const todo1: Todo = { id: '1', title: 'Todo 1', status: 'todo', priority: 'low', createdAt: new Date(), updatedAt: new Date() };
    const todo2: Todo = { id: '2', title: 'Todo 2', status: 'in-progress', priority: 'medium', createdAt: new Date(), updatedAt: new Date() };

    service.addTodo(todo1);
    service.addTodo(todo2);

    expect(service.inProgressTodos().length).toBe(1);
    expect(service.inProgressTodos()[0].id).toBe('2');
  });

  it('should compute stats correctly', () => {
    const todo1: Todo = { id: '1', title: 'Todo 1', status: 'done', priority: 'high', createdAt: new Date(), updatedAt: new Date() };
    const todo2: Todo = { id: '2', title: 'Todo 2', status: 'todo', priority: 'medium', createdAt: new Date(), updatedAt: new Date() };
    const todo3: Todo = { id: '3', title: 'Todo 3', status: 'in-progress', priority: 'high', createdAt: new Date(), updatedAt: new Date() };

    service.addTodo(todo1);
    service.addTodo(todo2);
    service.addTodo(todo3);

    const stats = service.todoStats();
    expect(stats.total).toBe(3);
    expect(stats.completed).toBe(1);
    expect(stats.pending).toBe(1);
    expect(stats.inProgress).toBe(1);
    expect(stats.highPriority).toBe(2);
    expect(stats.completionRate).toBe(33.33333333333333);
  });
});
```

---

## ⚡ Étape 4.2 : Optimisations de Performance

### **Pourquoi optimiser les performances ?**

Les optimisations améliorent l'**expérience utilisateur** et la **réactivité de l'application** :
- **🚀 Temps de chargement réduit** : Pages plus rapides
- **⚡ Interactions fluides** : Pas de lag lors des interactions
- **📱 Support mobile** : Applications performantes sur tous les appareils
- **💰 Coûts réduits** : Moins de ressources serveur nécessaires

### **Stratégies d'optimisation Angular**

#### **1. ChangeDetectionStrategy.OnPush**
```typescript
// src/app/features/todos/components/todo-list.component.ts
import { Component, inject, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, PriorityPipe, HighlightDirective],
  changeDetection: ChangeDetectionStrategy.OnPush, // ⚡ Optimisation
  template: `...`
})
export class TodoListComponent {
  todoService = inject(TodoService);
}
```

**Avantages :**
- Détection de changements uniquement quand les références changent
- Réduction drastique des cycles de détection
- Performance améliorée pour les gros composants

#### **2. TrackBy pour les listes**
```typescript
// src/app/features/todos/components/todo-list.component.ts
export class TodoListComponent {
  todoService = inject(TodoService);

  // ⚡ Optimisation : TrackBy pour éviter la recréation des éléments
  trackByTodoId(index: number, todo: Todo): string {
    return todo.id;
  }
}
```

```html
<!-- Template avec trackBy -->
@for (todo of todoService.pendingTodos(); track trackByTodoId) {
  <div class="todo-item">
    {{ todo.title }}
  </div>
}
```

#### **3. Lazy Loading avancé**
```typescript
// src/app/app.routes.ts
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'todos',
    loadChildren: () => import('./features/todos/todos.routes').then(m => m.TODOS_ROUTES)
  },
  {
    path: 'admin',
    loadChildren: () => import('./features/admin/admin.routes').then(m => m.ADMIN_ROUTES),
    canActivate: [authGuard, adminGuard]
  }
];
```

#### **4. Optimisation des bundles**
```typescript
// angular.json
{
  "projects": {
    "angular-todolist": {
      "architect": {
        "build": {
          "configurations": {
            "production": {
              "optimization": true,
              "outputHashing": "all",
              "sourceMap": false,
              "namedChunks": false,
              "aot": true,
              "extractLicenses": true,
              "vendorChunk": false,
              "buildOptimizer": true,
              "budgets": [
                {
                  "type": "initial",
                  "maximumWarning": "2mb",
                  "maximumError": "5mb"
                },
                {
                  "type": "anyComponentStyle",
                  "maximumWarning": "6kb",
                  "maximumError": "10kb"
                }
              ]
            }
          }
        }
      }
    }
  }
}
```

---

## 🚀 Étape 4.3 : Build et Déploiement

### **Configuration de production**

#### **1. Variables d'environnement**
```typescript
// src/environments/environment.ts (développement)
export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  version: '1.0.0'
};
```

```typescript
// src/environments/environment.prod.ts (production)
export const environment = {
  production: true,
  apiUrl: 'https://api.monapp.com',
  version: '1.0.0'
};
```

#### **2. Configuration de build**
```json
// angular.json - Configuration production
{
  "configurations": {
    "production": {
      "budgets": [
        {
          "type": "initial",
          "maximumWarning": "2mb",
          "maximumError": "5mb"
        }
      ],
      "fileReplacements": [
        {
          "replace": "src/environments/environment.ts",
          "with": "src/environments/environment.prod.ts"
        }
      ],
      "outputHashing": "all",
      "sourceMap": false,
      "namedChunks": false,
      "aot": true,
      "extractLicenses": true,
      "vendorChunk": false,
      "buildOptimizer": true
    }
  }
}
```

### **Déploiement sur différentes plateformes**

#### **1. Déploiement sur Vercel**
```json
// vercel.json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": {
        "distDir": "dist/angular-todolist"
      }
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "/index.html"
    }
  ]
}
```

#### **2. Déploiement sur Netlify**
```toml
# netlify.toml
[build]
  publish = "dist/angular-todolist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

#### **3. CI/CD Pipeline complet**
```yaml
# .github/workflows/ci-cd.yml
name: CI/CD Pipeline

on:
  push:
    branches: [ main, develop ]
  pull_request:
    branches: [ main ]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '20'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Run linting
      run: npm run lint
    
    - name: Run unit tests
      run: npm test -- --watch=false --browsers=ChromeHeadless
    
    - name: Build application
      run: npm run build
    
    - name: Upload build artifacts
      uses: actions/upload-artifact@v3
      with:
        name: build-files
        path: dist/

  deploy:
    needs: test
    runs-on: ubuntu-latest
    if: github.ref == 'refs/heads/main'
    steps:
    - uses: actions/checkout@v3
    
    - name: Download build artifacts
      uses: actions/download-artifact@v3
      with:
        name: build-files
        path: dist/
    
    - name: Deploy to production
      run: |
        # Déploiement selon la plateforme choisie
        echo "Deploying to production..."
```

---

## 📋 Étape 4.4 : Bonnes Pratiques et Code Review

### **Standards de code**

#### **1. ESLint Configuration avancée**
```javascript
// eslint.config.js
import js from '@eslint/js';
import angular from '@angular-eslint/eslint-plugin';
import angularTemplate from '@angular-eslint/eslint-plugin-template';

export default [
  js.configs.recommended,
  {
    files: ['**/*.ts'],
    plugins: {
      '@angular-eslint': angular,
    },
    rules: {
      ...angular.configs.recommended.rules,
      '@angular-eslint/prefer-inject': 'error',
      '@angular-eslint/no-empty-lifecycle-method': 'error',
      '@angular-eslint/use-lifecycle-interface': 'error',
      '@angular-eslint/no-output-native': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/use-component-selector': 'error',
      '@angular-eslint/use-directive-selector': 'error',
      '@angular-eslint/no-conflicting-lifecycle': 'error',
      '@angular-eslint/no-host-metadata-property': 'error',
      '@angular-eslint/no-inputs-metadata-property': 'error',
      '@angular-eslint/no-outputs-metadata-property': 'error',
      '@angular-eslint/no-queries-metadata-property': 'error',
      '@angular-eslint/contextual-lifecycle': 'error',
      '@angular-eslint/no-lifecycle-call': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@angular-eslint/pipe-prefix': 'error',
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'app',
          style: 'kebab-case'
        }
      ],
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'app',
          style: 'camelCase'
        }
      ]
    }
  }
];
```

#### **2. Husky Hooks avancés**
```json
// package.json
{
  "scripts": {
    "prepare": "husky install",
    "lint": "ng lint",
    "lint:fix": "ng lint --fix",
    "test": "ng test",
    "test:coverage": "ng test --code-coverage",
    "e2e": "ng e2e",
    "build": "ng build",
    "build:prod": "ng build --configuration production",
    "analyze": "ng build --stats-json && webpack-bundle-analyzer dist/angular-todolist/stats.json"
  },
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged",
      "pre-push": "npm run test:coverage"
    }
  },
  "lint-staged": {
    "*.{ts,js}": [
      "eslint --fix",
      "prettier --write"
    ],
    "*.{html,css,scss,json,md}": [
      "prettier --write"
    ]
  }
}
```

### **Code Review Checklist**

#### **1. Checklist Générale**
- [ ] **Lisibilité** : Le code est-il facile à comprendre ?
- [ ] **Performance** : Y a-t-il des optimisations possibles ?
- [ ] **Sécurité** : Y a-t-il des vulnérabilités potentielles ?
- [ ] **Tests** : Les tests couvrent-ils les nouveaux cas ?
- [ ] **Documentation** : Les changements sont-ils documentés ?

#### **2. Checklist Angular Spécifique**
- [ ] **Signals** : Utilisation correcte des Signals vs Observables ?
- [ ] **OnPush** : ChangeDetectionStrategy.OnPush utilisé quand approprié ?
- [ ] **TrackBy** : TrackBy utilisé pour les listes ?
- [ ] **Lazy Loading** : Modules chargés de manière lazy ?
- [ ] **Injection** : `inject()` utilisé au lieu du constructeur ?
- [ ] **Standalone** : Composants standalone utilisés ?
- [ ] **Types** : Types TypeScript stricts utilisés ?

#### **3. Checklist Performance**
- [ ] **Bundle Size** : Taille du bundle optimisée ?
- [ ] **Images** : Images optimisées et lazy loaded ?
- [ ] **Caching** : Stratégie de cache appropriée ?
- [ ] **CDN** : Ressources statiques servies via CDN ?
- [ ] **Compression** : Gzip/Brotli activé ?

### **Documentation du code**

#### **1. JSDoc pour les services**
```typescript
/**
 * Service de gestion des todos avec Signals
 * 
 * Ce service utilise les Signals d'Angular 20+ pour une gestion d'état
 * performante et réactive. Il fournit des computed signals pour
 * les statistiques et le filtrage des todos.
 * 
 * @example
 * ```typescript
 * const todoService = inject(TodoService);
 * const completedTodos = todoService.completedTodos();
 * const stats = todoService.todoStats();
 * ```
 */
@Injectable({
  providedIn: 'root'
})
export class TodoService {
  /**
   * Signal writable contenant tous les todos
   * @private
   */
  private todos = signal<Todo[]>([]);

  /**
   * Signal readonly pour accéder aux todos depuis l'extérieur
   */
  public todos$ = this.todos.asReadonly();

  /**
   * Signal computed pour les todos complétés
   * @returns {Signal<Todo[]>} Todos avec status 'done'
   */
  public completedTodos = computed(() => 
    this.todos().filter(todo => todo.status === 'done')
  );

  /**
   * Ajoute un nouveau todo
   * @param {Todo} todo - Le todo à ajouter
   * @returns {Promise<Todo>} Le todo ajouté avec ID généré
   */
  async addTodo(todo: Omit<Todo, 'id'>): Promise<Todo> {
    const newTodo: Todo = {
      ...todo,
      id: this.generateId(),
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.todos.update(todos => [...todos, newTodo]);
    return newTodo;
  }

  /**
   * Génère un ID unique pour un todo
   * @private
   * @returns {string} ID unique
   */
  private generateId(): string {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }
}
```

---

## 🎯 État actuel de l'application

### **Fonctionnalités implémentées :**
- ✅ **Tests complets** : Unit, integration et e2e tests
- ✅ **Optimisations de performance** : OnPush strategy, trackBy, lazy loading
- ✅ **Build de production** : Configuration optimisée
- ✅ **Déploiement** : Multi-plateformes (Vercel, Netlify, GitHub Pages, Firebase)
- ✅ **CI/CD** : Pipeline automatisé avec tests et déploiement
- ✅ **Bonnes pratiques** : ESLint strict, Prettier, Husky hooks
- ✅ **Documentation** : JSDoc, README complet

### **Concepts maîtrisés :**
- **Tests Angular** : Jasmine, TestBed, ComponentFixture, Playwright
- **Performance** : ChangeDetectionStrategy, OnPush, trackBy, lazy loading
- **Build et déploiement** : Angular CLI, multi-environnements, CI/CD
- **Bonnes pratiques** : Code review, refactoring, documentation

### **Prêt pour la Partie 5 :**
- ✅ Tests complets et automatisés
- ✅ Performance optimisée
- ✅ Déploiement automatisé
- ✅ Code de qualité professionnelle

---

*💡 **Conseil du mentor :** Les tests ne sont pas une option, ils sont essentiels pour maintenir la qualité du code. Prenez l'habitude d'écrire des tests pour chaque nouvelle fonctionnalité.*

*🔧 **Conseil qualité :** Utilisez toujours OnPush strategy pour les composants qui ne changent pas souvent. Cela améliore drastiquement les performances.*

---

## 🚀 Préparation pour la Partie 5

### **Objectifs de la Partie 5 :**
- 🎯 **Projet final complet** : Application TodoList étendue
- 🔧 **Fonctionnalités avancées** : Drag & drop, filtres avancés, export
- 📊 **Analytics** : Suivi des performances et métriques
- 🚀 **Déploiement en production** : Mise en ligne de l'application finale

### **Concepts à maîtriser :**
- **Fonctionnalités avancées** : Drag & drop, filtres complexes, export
- **Analytics** : Google Analytics, métriques de performance
- **Monitoring** : Logs, alertes, surveillance en production
- **Maintenance** : Mises à jour, migrations, support

### **Prérequis validés :**
- ✅ Tests complets et automatisés
- ✅ Performance optimisée
- ✅ Déploiement automatisé
- ✅ Code de qualité professionnelle
- ✅ Documentation complète

---

*🎯 **Prêt pour la Partie 5 !** Votre application a maintenant une base solide avec des tests, des optimisations de performance et un déploiement automatisé. Dans la Partie 5, nous créerons le projet final avec des fonctionnalités avancées.*

