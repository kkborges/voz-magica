#!/usr/bin/env node
/**
 * Script para configurar pastas nativas do React Native
 *
 * Este script:
 * 1. Verifica se as pastas android/ e ios/ estão vazias
 * 2. Cria um projeto React Native temporário
 * 3. Copia as pastas nativas para o projeto atual
 * 4. Limpa arquivos temporários
 * 5. Configura permissões necessárias
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
};

const log = {
  info: (msg) => console.log(`${colors.blue}ℹ${colors.reset} ${msg}`),
  success: (msg) => console.log(`${colors.green}✓${colors.reset} ${msg}`),
  warn: (msg) => console.log(`${colors.yellow}⚠${colors.reset} ${msg}`),
  error: (msg) => console.log(`${colors.red}✗${colors.reset} ${msg}`),
  title: (msg) => console.log(`\n${colors.bright}${msg}${colors.reset}\n`),
};

const projectRoot = path.resolve(__dirname, '..');
const tempProjectName = 'VozMagicaTemp';
const tempProjectPath = path.join(projectRoot, '..', tempProjectName);

function checkNativeFolders() {
  const androidPath = path.join(projectRoot, 'android');
  const iosPath = path.join(projectRoot, 'ios');

  const androidEmpty = fs.readdirSync(androidPath).length === 0;
  const iosEmpty = fs.readdirSync(iosPath).length === 0;

  return { androidEmpty, iosEmpty };
}

function executeCommand(command, description) {
  log.info(description);
  try {
    execSync(command, { stdio: 'inherit', cwd: projectRoot });
    log.success(`${description} - Concluído`);
    return true;
  } catch (error) {
    log.error(`${description} - Falhou`);
    return false;
  }
}

function copyDirectory(src, dest) {
  if (!fs.existsSync(src)) {
    log.warn(`Diretório não encontrado: ${src}`);
    return false;
  }

  try {
    execSync(`cp -r "${src}"/* "${dest}"/`, { stdio: 'inherit' });
    log.success(`Copiado: ${path.basename(src)}`);
    return true;
  } catch (error) {
    log.error(`Erro ao copiar: ${path.basename(src)}`);
    return false;
  }
}

function updateAndroidManifest() {
  const manifestPath = path.join(
    projectRoot,
    'android',
    'app',
    'src',
    'main',
    'AndroidManifest.xml'
  );

  if (!fs.existsSync(manifestPath)) {
    log.warn('AndroidManifest.xml não encontrado');
    return false;
  }

  try {
    let manifest = fs.readFileSync(manifestPath, 'utf8');

    // Adicionar permissão de microfone se não existir
    if (!manifest.includes('RECORD_AUDIO')) {
      const permissionLine = '  <uses-permission android:name="android.permission.RECORD_AUDIO" />';
      manifest = manifest.replace(
        '<manifest',
        `<manifest\n${permissionLine}`
      );
      fs.writeFileSync(manifestPath, manifest);
      log.success('Permissão RECORD_AUDIO adicionada ao AndroidManifest.xml');
    }

    return true;
  } catch (error) {
    log.error('Erro ao atualizar AndroidManifest.xml');
    return false;
  }
}

function updateInfoPlist() {
  const infoPlistPath = path.join(
    projectRoot,
    'ios',
    'VozMagica',
    'Info.plist'
  );

  if (!fs.existsSync(infoPlistPath)) {
    log.warn('Info.plist não encontrado');
    return false;
  }

  try {
    let plist = fs.readFileSync(infoPlistPath, 'utf8');

    // Adicionar permissão de microfone se não existir
    if (!plist.includes('NSMicrophoneUsageDescription')) {
      const microphonePermission = `  <key>NSMicrophoneUsageDescription</key>
  <string>Voz Mágica precisa do microfone para reconhecer sua fala e ajudar no aprendizado!</string>`;

      plist = plist.replace('</dict>', `${microphonePermission}\n</dict>`);
      fs.writeFileSync(infoPlistPath, plist);
      log.success('Permissão de microfone adicionada ao Info.plist');
    }

    return true;
  } catch (error) {
    log.error('Erro ao atualizar Info.plist');
    return false;
  }
}

async function main() {
  log.title('🚀 Setup de Pastas Nativas - Voz Mágica');

  // 1. Verificar estado das pastas
  log.info('Verificando pastas nativas...');
  const { androidEmpty, iosEmpty } = checkNativeFolders();

  if (!androidEmpty && !iosEmpty) {
    log.success('Pastas android/ e ios/ já estão configuradas!');
    log.info('Se quiser reconfigurar, delete o conteúdo das pastas primeiro.');
    process.exit(0);
  }

  // 2. Verificar se React Native CLI está disponível
  log.info('Verificando React Native CLI...');
  try {
    execSync('npx react-native --version', { stdio: 'ignore' });
    log.success('React Native CLI disponível');
  } catch {
    log.error('React Native CLI não encontrado');
    log.info('Instalando dependências primeiro: npm install');
    process.exit(1);
  }

  // 3. Criar projeto temporário
  log.title('📦 Criando projeto temporário...');
  const createCommand = `npx react-native@0.73.0 init ${tempProjectName} --version 0.73.0 --template react-native-template-typescript --skip-install`;

  if (!executeCommand(createCommand, 'Criando projeto React Native')) {
    log.error('Falha ao criar projeto temporário');
    process.exit(1);
  }

  // 4. Copiar pastas nativas
  log.title('📁 Copiando pastas nativas...');

  if (androidEmpty) {
    const androidSrc = path.join(tempProjectPath, 'android');
    const androidDest = path.join(projectRoot, 'android');
    copyDirectory(androidSrc, androidDest);
  }

  if (iosEmpty) {
    const iosSrc = path.join(tempProjectPath, 'ios');
    const iosDest = path.join(projectRoot, 'ios');
    copyDirectory(iosSrc, iosDest);
  }

  // 5. Renomear referências ao projeto
  log.title('🔧 Configurando nomes do projeto...');

  try {
    // Renomear iOS
    const oldIosPath = path.join(projectRoot, 'ios', tempProjectName);
    const newIosPath = path.join(projectRoot, 'ios', 'VozMagica');

    if (fs.existsSync(oldIosPath)) {
      fs.renameSync(oldIosPath, newIosPath);
      log.success('Pasta iOS renomeada para VozMagica');
    }

    // Atualizar referências em arquivos
    const filesToUpdate = [
      'ios/Podfile',
      'ios/VozMagica.xcodeproj/project.pbxproj',
      'android/settings.gradle',
      'android/app/build.gradle',
      'app.json',
    ];

    filesToUpdate.forEach((file) => {
      const filePath = path.join(projectRoot, file);
      if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = content.replace(new RegExp(tempProjectName, 'g'), 'VozMagica');
        fs.writeFileSync(filePath, content);
        log.success(`Atualizado: ${file}`);
      }
    });
  } catch (error) {
    log.warn('Erro ao renomear projeto (pode precisar de ajuste manual)');
  }

  // 6. Configurar permissões
  log.title('🔐 Configurando permissões...');
  updateAndroidManifest();
  updateInfoPlist();

  // 7. Limpar projeto temporário
  log.title('🧹 Limpando arquivos temporários...');
  try {
    execSync(`rm -rf "${tempProjectPath}"`, { stdio: 'ignore' });
    log.success('Projeto temporário removido');
  } catch {
    log.warn('Não foi possível remover projeto temporário automaticamente');
    log.info(`Por favor, remova manualmente: ${tempProjectPath}`);
  }

  // 8. Instruções finais
  log.title('✅ Setup concluído com sucesso!');
  console.log('\n📱 Próximos passos:\n');
  console.log('1. Para Android:');
  console.log('   npm run android\n');
  console.log('2. Para iOS (apenas macOS):');
  console.log('   npm run pods');
  console.log('   npm run ios\n');
  console.log('3. Consulte BUILD.md para mais informações\n');
}

// Executar
main().catch((error) => {
  log.error('Erro no setup:');
  console.error(error);
  process.exit(1);
});
