# CI/CD with CircleCI

**This repository is configured with CircleCI to automate :**

- Vulnerability test

- Linting and formatting

- Code testing

- Building

- Merge to Test Branch

- Deployment

## Workflow 

**This workflow use circleci orbs for a better standardized workflow :**

```yaml
version: 2.1
orbs:
  node: circleci/node@7.1.0
  browser-tools: circleci/browser-tools@1.5.3
  cypress: cypress-io/cypress@4.1.0
```

**This workflow is split in 3 different Jobs :**

```yaml
jobs:
    - build-and-test:
        matrix:
            parameters:
            os: [docker]
            node-version: [19.9.0, 20.19.2, 21.7.3, 22.15.1]
        filters:
            branches:
                only:
                    - dev
    - merge-to-test:
        requires:
        - build-and-test
        filters:
            branches:
                only:
                    - dev
    - pull-request:
        filters:
            branches:
                only:
                    - test/circleci
```
For the **build-and-test** Jobs, we use 'matrix' parameters for testing portability on 4 different nodejs version in parallel.
Each of this jobs has been filtered to one specific branch.
**merge-to-test** Job need all 4 **build-and-test** Job to success before continue, pull-request job happened only when test/circleci received a trigger from merging.

## Structure - build-and-test

**Checkout and Node Install :**

```yaml
- checkout
- node/install:
    node-version: << parameters.node-version >>
```

**Retrieve cache :**

```yaml
- restore_cache:
          keys:
            - npm-deps-v1-{{ checksum "package-lock.json" }}
            - npm-deps-v1-
```

**Install Dependancies :**

```yaml
- run:
    name: Install dependencies
    command: npm install
```

**Save Cache (if cache not present or different) :**

```yaml
- save_cache:
    paths:
    - ~/.npm
    - node_modules
    key: npm-deps-v1-{{ checksum "package-lock.json" }}
```

**Install Xvfb (for Cypress) :**

```yaml
- run:
    name: Install Xvfb
    command: |
    sudo apt-get update
    sudo apt-get install -y xvfb
```

**Install Chrome Browser and Check the installation :**

```yaml
- browser-tools/install-chrome
- browser-tools/install-chromedriver
- run:
    name: Check Chrome install
    command: |
    google-chrome --version
    chromedriver --version
```

**Install lighthouse-ci, cypress and wait-on :**

```yaml
- run:
    name: Install lighthouse-ci
    command: npm install -g @lhci/cli@0.14.x
- cypress/install
- run:
    name: Install wait-on server
    command: npm install wait-on
```

**Patch index.mjs file in react-icons/lib dependancy for export file name depreciation error :**

```yaml
- run:
    name: Replace index.mjs in react-icons/lib
    command: |
    echo '
        export { IconsManifest } from "./iconsManifest.mjs";
        export { GenIcon, IconBase } from "./iconBase.mjs";
        export { DefaultContext, IconContext } from "./iconContext.mjs";
    ' > node_modules/react-icons/lib/index.mjs
```

**Run vulnerability dependancies test :**

```yaml
- run:
    name: Audit npm package
    command: npm audit
```

**Run linting test :**

```yaml
- run:
    name: Run Linter
    command: npm run lint
```

**Run type check test :**

```yaml
- run:
    name: Run type-check
    command: npm run type-check
```

**Run bundle analyzer :**

```yaml
- run: 
    name: Run Test Build with Bundle Analyzer
    command: npm run analyze
```

**Run Lighthouse-ci with temporary config file and server start command :**

```yaml
- run:
    name: Run lighthouse-ci
    command: |
    echo '{
        "ci": {
        "collect": {
            "url": ["http://localhost:3000"],
            "startServerCommand": "npm run start",
            "startServerReadyPattern": "started server",
            "numberOfRuns": 3
        },
        "upload": {
            "target": "temporary-public-storage"
        }
        }
    }' > /tmp/lhci-config.json
    lhci autorun --config=/tmp/lhci-config.json
- store_artifacts:
    path: .next/analyze
    destination: bundle-report
```

**Run jest tests**

```yaml
- run:
    name: Run jest test a11y
    command: npm run test:a11y
- run:
    name: Run jest tests build
    command: npm run test:build
```

**Store jest tests report in artifact file :**

```yaml
- store_artifacts:
    path: reports/html
    destination: jest-html-report
```

**Run Cypress e2e tests (Electron default browser) :**

```yaml
- cypress/run-tests:
    cypress-command: npx wait-on@latest http://localhost:3000 && npm run cypress:e2e
    start-command: npm start -- -p 3000
```

**Run Cypress component tests :**

```yaml
- cypress/run-tests:
    cypress-command: npx cypress run --component
```

**Run Cypress Visual Regression Tests**

```yaml
- run:
    name: Run Cypress visual-regression test
    command: |
    npm run cypress:visual-regression
```

**Store all cypress reports and screenshot in artifacts**

```yaml
- run:
    name: Save Cypress Image Diff Report HTML file
    command: |
    npx cypress-image-diff-html-report generate
- store_artifacts:
    path: cypress-image-diff-html-report
    destination: artifacts
- store_artifacts:
    path: cypress-image-diff-screenshots
```

## Structure - merge-to-test

**Checkout**

```yaml
- checkout
```

**Node Install and Install Dependacies**

```yaml
- node/install
- node/install-packages
```

**Vercel CLI Install**

```yaml
- run:
    name: Vercel CLI Installation
    command: npm install -g vercel@latest
```

**Compile Optimized Build for test environement**
```yaml
- run:
    name: Create Optimized Build
    command: npm run build:test
```


**Set Database based on DEV Branch**
```yaml
- run:
    name: Set database URL based to branch
    command: |
    if [ "$CIRCLE_BRANCH" == "dev" ]; then
        echo "DATABASE_URL=$DATABASE_URL_TEST" >> $BASH_ENV
    fi
```

**Pull ENV Information from Vercel**
```yaml
- run:
    name: Pull Vercel Environment Information
    command: vercel pull --yes --environment=preview --token=$VERCEL_TOKEN
```

**Deploying build to Vercel**
```yaml
- run:
    name: Deploy to Vercel
    command: |
    vercel deploy --prebuilt --token=$VERCEL_TOKEN --confirm
```

**Setup Git Info and Merge Dev Branch to test/circleci branch**
```yaml
- run:
    name: Setup Git
    command: |
    git config --global user.email "$GIT_EMAIL"
    git config --global user.name "GIT_NAME"
    git remote set-url origin https://${GH_TOKEN}@github.com/KZ-68/CDA-BucketList-App.git
- run:
    name: Merge dev into test/circleci
    command: |
    git fetch origin
    git checkout test/circleci
    git merge origin/dev --no-edit
    git push origin test/circleci
```

## Structure -- pull-request

**After merge trigger in circleci, create pull request for code review :**

```yaml
 - run:
    name: Create Pull Request
    command: |
    curl -X POST -H "Authorization: token ${GH_TOKEN}" \
        -H "Accept: application/vnd.github.v3+json" \
        https://api.github.com/repos/KZ-68/CDA-BucketList-App/pulls \
        -d '{
        "title": "PR from develop to main (circleci)",
        "head": "test/circleci",
        "base": "main",
        "body": "PR from develop to main (circleci)"
        }'
```

## Secrets

**This workflow use different secrets token in each job :**

- VERCEL_TOKEN correspond to env variable access token from Vercel
- GH_TOKEN correspond to Github Token with restricted access
- GIT_EMAIL and GIT_NAME correspond to Git Informations for merge
- DATABASE_URL_TEST correspond to mongodb database url
