module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // Nova funcionalidade
        'fix',      // Correção de bug
        'docs',     // Documentação
        'style',    // Formatação, ponto e vírgula, etc
        'refactor', // Refatoração de código
        'perf',     // Melhoria de performance
        'test',     // Adição/modificação de testes
        'chore',    // Tarefas de build, configs, etc
        'revert',   // Reverter commit anterior
        'ci',       // Mudanças em CI/CD
        'build'     // Mudanças no sistema de build
      ]
    ],
    'subject-case': [0],
    'subject-max-length': [2, 'always', 100]
  }
};
