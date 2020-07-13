const options = {
   level: 5,
   release: 'LOG-'
};

function createLogger() {
   function println(theme, level, args) {
      if (options.level < level) return;
      console.log(options.release + theme, ...args);
   }

   return {
      log: function () {
         println('[log]', 5, arguments);
      },
      info: function () {
         println('[info] ', 4, arguments);
      },
      warn: function () {
         println('[warn]', 3, arguments);
      },
      error: function () {
         println('[error]', 2, arguments);
      },
      fatal: function () {
         println('[fatal]', 1, arguments);
      }
   };
}

export const logger = createLogger();

export function setLoggerLevel(n) {
   options.level = n >= 1 && n <= 5 ? n : 5;
}

export function setLoggerRelease(str) {
   options.release = !!str && typeof str === 'string' ? str : options.release;
}