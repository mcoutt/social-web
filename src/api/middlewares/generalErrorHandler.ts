// import config from '../../config/config';
// import {Logger} from '../utils/logger';

// const { errors } = typeOrmConfig;

/**
 * Node startup error handler.
 *
 * @param  {NodeJS.ErrnoException} err
 * @returns <void>
 */
export default function nodeErrorHandler(err: NodeJS.ErrnoException): void {
    // const logger = new Logger(__filename);
    switch (err.code) {
        case 'EACCES':
            console.log('portRequiresPrivilege');
            process.exit(1);

            break;

        case 'EADDRINUSE':
            console.log('portInUse');
            process.exit(1);

            break;

        default:
            throw err;
    }
}
