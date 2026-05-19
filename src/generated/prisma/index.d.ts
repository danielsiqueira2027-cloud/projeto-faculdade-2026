
/**
 * Client
**/

import * as runtime from './runtime/client.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Client
 * 
 */
export type Client = $Result.DefaultSelection<Prisma.$ClientPayload>
/**
 * Model Professional
 * 
 */
export type Professional = $Result.DefaultSelection<Prisma.$ProfessionalPayload>
/**
 * Model Category
 * 
 */
export type Category = $Result.DefaultSelection<Prisma.$CategoryPayload>
/**
 * Model ProfessionalCategory
 * 
 */
export type ProfessionalCategory = $Result.DefaultSelection<Prisma.$ProfessionalCategoryPayload>
/**
 * Model Service
 * 
 */
export type Service = $Result.DefaultSelection<Prisma.$ServicePayload>
/**
 * Model Order
 * 
 */
export type Order = $Result.DefaultSelection<Prisma.$OrderPayload>
/**
 * Model PortfolioItem
 * 
 */
export type PortfolioItem = $Result.DefaultSelection<Prisma.$PortfolioItemPayload>
/**
 * Model Testimonial
 * 
 */
export type Testimonial = $Result.DefaultSelection<Prisma.$TestimonialPayload>
/**
 * Model Appointment
 * 
 */
export type Appointment = $Result.DefaultSelection<Prisma.$AppointmentPayload>
/**
 * Model Certification
 * 
 */
export type Certification = $Result.DefaultSelection<Prisma.$CertificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const ServiceStatus: {
  ativo: 'ativo',
  inativo: 'inativo'
};

export type ServiceStatus = (typeof ServiceStatus)[keyof typeof ServiceStatus]


export const OrderStatus: {
  PENDENTE: 'PENDENTE',
  EM_ANDAMENTO: 'EM_ANDAMENTO',
  CONCLUIDO: 'CONCLUIDO',
  CANCELADO: 'CANCELADO'
};

export type OrderStatus = (typeof OrderStatus)[keyof typeof OrderStatus]


export const AppointmentStatus: {
  CONFIRMADO: 'CONFIRMADO',
  PENDENTE: 'PENDENTE',
  CONCLUIDO: 'CONCLUIDO',
  CANCELADO: 'CANCELADO'
};

export type AppointmentStatus = (typeof AppointmentStatus)[keyof typeof AppointmentStatus]

}

export type ServiceStatus = $Enums.ServiceStatus

export const ServiceStatus: typeof $Enums.ServiceStatus

export type OrderStatus = $Enums.OrderStatus

export const OrderStatus: typeof $Enums.OrderStatus

export type AppointmentStatus = $Enums.AppointmentStatus

export const AppointmentStatus: typeof $Enums.AppointmentStatus

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  const U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient({
   *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
   * })
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://pris.ly/d/client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://pris.ly/d/raw-queries).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>

  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.client`: Exposes CRUD operations for the **Client** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Clients
    * const clients = await prisma.client.findMany()
    * ```
    */
  get client(): Prisma.ClientDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professional`: Exposes CRUD operations for the **Professional** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Professionals
    * const professionals = await prisma.professional.findMany()
    * ```
    */
  get professional(): Prisma.ProfessionalDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.category`: Exposes CRUD operations for the **Category** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Categories
    * const categories = await prisma.category.findMany()
    * ```
    */
  get category(): Prisma.CategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.professionalCategory`: Exposes CRUD operations for the **ProfessionalCategory** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more ProfessionalCategories
    * const professionalCategories = await prisma.professionalCategory.findMany()
    * ```
    */
  get professionalCategory(): Prisma.ProfessionalCategoryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.service`: Exposes CRUD operations for the **Service** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Services
    * const services = await prisma.service.findMany()
    * ```
    */
  get service(): Prisma.ServiceDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.order`: Exposes CRUD operations for the **Order** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Orders
    * const orders = await prisma.order.findMany()
    * ```
    */
  get order(): Prisma.OrderDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.portfolioItem`: Exposes CRUD operations for the **PortfolioItem** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more PortfolioItems
    * const portfolioItems = await prisma.portfolioItem.findMany()
    * ```
    */
  get portfolioItem(): Prisma.PortfolioItemDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.testimonial`: Exposes CRUD operations for the **Testimonial** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Testimonials
    * const testimonials = await prisma.testimonial.findMany()
    * ```
    */
  get testimonial(): Prisma.TestimonialDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.appointment`: Exposes CRUD operations for the **Appointment** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Appointments
    * const appointments = await prisma.appointment.findMany()
    * ```
    */
  get appointment(): Prisma.AppointmentDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.certification`: Exposes CRUD operations for the **Certification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Certifications
    * const certifications = await prisma.certification.findMany()
    * ```
    */
  get certification(): Prisma.CertificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 7.8.0
   * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
   */
  export type PrismaVersion = {
    client: string
    engine: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import Bytes = runtime.Bytes
  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Client: 'Client',
    Professional: 'Professional',
    Category: 'Category',
    ProfessionalCategory: 'ProfessionalCategory',
    Service: 'Service',
    Order: 'Order',
    PortfolioItem: 'PortfolioItem',
    Testimonial: 'Testimonial',
    Appointment: 'Appointment',
    Certification: 'Certification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]



  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "client" | "professional" | "category" | "professionalCategory" | "service" | "order" | "portfolioItem" | "testimonial" | "appointment" | "certification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Client: {
        payload: Prisma.$ClientPayload<ExtArgs>
        fields: Prisma.ClientFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ClientFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ClientFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findFirst: {
            args: Prisma.ClientFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ClientFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          findMany: {
            args: Prisma.ClientFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>[]
          }
          create: {
            args: Prisma.ClientCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          createMany: {
            args: Prisma.ClientCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ClientDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          update: {
            args: Prisma.ClientUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          deleteMany: {
            args: Prisma.ClientDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ClientUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ClientUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ClientPayload>
          }
          aggregate: {
            args: Prisma.ClientAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateClient>
          }
          groupBy: {
            args: Prisma.ClientGroupByArgs<ExtArgs>
            result: $Utils.Optional<ClientGroupByOutputType>[]
          }
          count: {
            args: Prisma.ClientCountArgs<ExtArgs>
            result: $Utils.Optional<ClientCountAggregateOutputType> | number
          }
        }
      }
      Professional: {
        payload: Prisma.$ProfessionalPayload<ExtArgs>
        fields: Prisma.ProfessionalFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>
          }
          findMany: {
            args: Prisma.ProfessionalFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>[]
          }
          create: {
            args: Prisma.ProfessionalCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>
          }
          createMany: {
            args: Prisma.ProfessionalCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProfessionalDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>
          }
          update: {
            args: Prisma.ProfessionalUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfessionalUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessional>
          }
          groupBy: {
            args: Prisma.ProfessionalGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalCountAggregateOutputType> | number
          }
        }
      }
      Category: {
        payload: Prisma.$CategoryPayload<ExtArgs>
        fields: Prisma.CategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findFirst: {
            args: Prisma.CategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          findMany: {
            args: Prisma.CategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>[]
          }
          create: {
            args: Prisma.CategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          createMany: {
            args: Prisma.CategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          update: {
            args: Prisma.CategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          deleteMany: {
            args: Prisma.CategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CategoryPayload>
          }
          aggregate: {
            args: Prisma.CategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCategory>
          }
          groupBy: {
            args: Prisma.CategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<CategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.CategoryCountArgs<ExtArgs>
            result: $Utils.Optional<CategoryCountAggregateOutputType> | number
          }
        }
      }
      ProfessionalCategory: {
        payload: Prisma.$ProfessionalCategoryPayload<ExtArgs>
        fields: Prisma.ProfessionalCategoryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ProfessionalCategoryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCategoryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ProfessionalCategoryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCategoryPayload>
          }
          findFirst: {
            args: Prisma.ProfessionalCategoryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCategoryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ProfessionalCategoryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCategoryPayload>
          }
          findMany: {
            args: Prisma.ProfessionalCategoryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCategoryPayload>[]
          }
          create: {
            args: Prisma.ProfessionalCategoryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCategoryPayload>
          }
          createMany: {
            args: Prisma.ProfessionalCategoryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ProfessionalCategoryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCategoryPayload>
          }
          update: {
            args: Prisma.ProfessionalCategoryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCategoryPayload>
          }
          deleteMany: {
            args: Prisma.ProfessionalCategoryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ProfessionalCategoryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ProfessionalCategoryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ProfessionalCategoryPayload>
          }
          aggregate: {
            args: Prisma.ProfessionalCategoryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateProfessionalCategory>
          }
          groupBy: {
            args: Prisma.ProfessionalCategoryGroupByArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalCategoryGroupByOutputType>[]
          }
          count: {
            args: Prisma.ProfessionalCategoryCountArgs<ExtArgs>
            result: $Utils.Optional<ProfessionalCategoryCountAggregateOutputType> | number
          }
        }
      }
      Service: {
        payload: Prisma.$ServicePayload<ExtArgs>
        fields: Prisma.ServiceFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ServiceFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ServiceFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findFirst: {
            args: Prisma.ServiceFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ServiceFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          findMany: {
            args: Prisma.ServiceFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>[]
          }
          create: {
            args: Prisma.ServiceCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          createMany: {
            args: Prisma.ServiceCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.ServiceDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          update: {
            args: Prisma.ServiceUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          deleteMany: {
            args: Prisma.ServiceDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ServiceUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.ServiceUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ServicePayload>
          }
          aggregate: {
            args: Prisma.ServiceAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateService>
          }
          groupBy: {
            args: Prisma.ServiceGroupByArgs<ExtArgs>
            result: $Utils.Optional<ServiceGroupByOutputType>[]
          }
          count: {
            args: Prisma.ServiceCountArgs<ExtArgs>
            result: $Utils.Optional<ServiceCountAggregateOutputType> | number
          }
        }
      }
      Order: {
        payload: Prisma.$OrderPayload<ExtArgs>
        fields: Prisma.OrderFieldRefs
        operations: {
          findUnique: {
            args: Prisma.OrderFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.OrderFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findFirst: {
            args: Prisma.OrderFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.OrderFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          findMany: {
            args: Prisma.OrderFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>[]
          }
          create: {
            args: Prisma.OrderCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          createMany: {
            args: Prisma.OrderCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.OrderDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          update: {
            args: Prisma.OrderUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          deleteMany: {
            args: Prisma.OrderDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.OrderUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.OrderUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$OrderPayload>
          }
          aggregate: {
            args: Prisma.OrderAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateOrder>
          }
          groupBy: {
            args: Prisma.OrderGroupByArgs<ExtArgs>
            result: $Utils.Optional<OrderGroupByOutputType>[]
          }
          count: {
            args: Prisma.OrderCountArgs<ExtArgs>
            result: $Utils.Optional<OrderCountAggregateOutputType> | number
          }
        }
      }
      PortfolioItem: {
        payload: Prisma.$PortfolioItemPayload<ExtArgs>
        fields: Prisma.PortfolioItemFieldRefs
        operations: {
          findUnique: {
            args: Prisma.PortfolioItemFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.PortfolioItemFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>
          }
          findFirst: {
            args: Prisma.PortfolioItemFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.PortfolioItemFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>
          }
          findMany: {
            args: Prisma.PortfolioItemFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>[]
          }
          create: {
            args: Prisma.PortfolioItemCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>
          }
          createMany: {
            args: Prisma.PortfolioItemCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.PortfolioItemDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>
          }
          update: {
            args: Prisma.PortfolioItemUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>
          }
          deleteMany: {
            args: Prisma.PortfolioItemDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.PortfolioItemUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.PortfolioItemUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$PortfolioItemPayload>
          }
          aggregate: {
            args: Prisma.PortfolioItemAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePortfolioItem>
          }
          groupBy: {
            args: Prisma.PortfolioItemGroupByArgs<ExtArgs>
            result: $Utils.Optional<PortfolioItemGroupByOutputType>[]
          }
          count: {
            args: Prisma.PortfolioItemCountArgs<ExtArgs>
            result: $Utils.Optional<PortfolioItemCountAggregateOutputType> | number
          }
        }
      }
      Testimonial: {
        payload: Prisma.$TestimonialPayload<ExtArgs>
        fields: Prisma.TestimonialFieldRefs
        operations: {
          findUnique: {
            args: Prisma.TestimonialFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.TestimonialFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          findFirst: {
            args: Prisma.TestimonialFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.TestimonialFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          findMany: {
            args: Prisma.TestimonialFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>[]
          }
          create: {
            args: Prisma.TestimonialCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          createMany: {
            args: Prisma.TestimonialCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.TestimonialDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          update: {
            args: Prisma.TestimonialUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          deleteMany: {
            args: Prisma.TestimonialDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.TestimonialUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.TestimonialUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$TestimonialPayload>
          }
          aggregate: {
            args: Prisma.TestimonialAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTestimonial>
          }
          groupBy: {
            args: Prisma.TestimonialGroupByArgs<ExtArgs>
            result: $Utils.Optional<TestimonialGroupByOutputType>[]
          }
          count: {
            args: Prisma.TestimonialCountArgs<ExtArgs>
            result: $Utils.Optional<TestimonialCountAggregateOutputType> | number
          }
        }
      }
      Appointment: {
        payload: Prisma.$AppointmentPayload<ExtArgs>
        fields: Prisma.AppointmentFieldRefs
        operations: {
          findUnique: {
            args: Prisma.AppointmentFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.AppointmentFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findFirst: {
            args: Prisma.AppointmentFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.AppointmentFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          findMany: {
            args: Prisma.AppointmentFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>[]
          }
          create: {
            args: Prisma.AppointmentCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          createMany: {
            args: Prisma.AppointmentCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.AppointmentDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          update: {
            args: Prisma.AppointmentUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          deleteMany: {
            args: Prisma.AppointmentDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.AppointmentUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.AppointmentUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$AppointmentPayload>
          }
          aggregate: {
            args: Prisma.AppointmentAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAppointment>
          }
          groupBy: {
            args: Prisma.AppointmentGroupByArgs<ExtArgs>
            result: $Utils.Optional<AppointmentGroupByOutputType>[]
          }
          count: {
            args: Prisma.AppointmentCountArgs<ExtArgs>
            result: $Utils.Optional<AppointmentCountAggregateOutputType> | number
          }
        }
      }
      Certification: {
        payload: Prisma.$CertificationPayload<ExtArgs>
        fields: Prisma.CertificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CertificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CertificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>
          }
          findFirst: {
            args: Prisma.CertificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CertificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>
          }
          findMany: {
            args: Prisma.CertificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>[]
          }
          create: {
            args: Prisma.CertificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>
          }
          createMany: {
            args: Prisma.CertificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.CertificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>
          }
          update: {
            args: Prisma.CertificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>
          }
          deleteMany: {
            args: Prisma.CertificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CertificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.CertificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CertificationPayload>
          }
          aggregate: {
            args: Prisma.CertificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCertification>
          }
          groupBy: {
            args: Prisma.CertificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<CertificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.CertificationCountArgs<ExtArgs>
            result: $Utils.Optional<CertificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     * 
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     * 
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-planetscale`
     */
    adapter?: runtime.SqlDriverAdapterFactory
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl?: string
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[]
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    client?: ClientOmit
    professional?: ProfessionalOmit
    category?: CategoryOmit
    professionalCategory?: ProfessionalCategoryOmit
    service?: ServiceOmit
    order?: OrderOmit
    portfolioItem?: PortfolioItemOmit
    testimonial?: TestimonialOmit
    appointment?: AppointmentOmit
    certification?: CertificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;

  export type GetLogType<T> = CheckIsLogLevel<
    T extends LogDefinition ? T['level'] : T
  >;

  export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition>
    ? GetLogType<T[number]>
    : never;

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    testimonials: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    testimonials?: boolean | UserCountOutputTypeCountTestimonialsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTestimonialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestimonialWhereInput
  }


  /**
   * Count Type ClientCountOutputType
   */

  export type ClientCountOutputType = {
    orders: number
  }

  export type ClientCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | ClientCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ClientCountOutputType
     */
    select?: ClientCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ClientCountOutputType without action
   */
  export type ClientCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type ProfessionalCountOutputType
   */

  export type ProfessionalCountOutputType = {
    categories: number
    services: number
    orders: number
    portfolio: number
    testimonials: number
    appointments: number
    certifications: number
  }

  export type ProfessionalCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    categories?: boolean | ProfessionalCountOutputTypeCountCategoriesArgs
    services?: boolean | ProfessionalCountOutputTypeCountServicesArgs
    orders?: boolean | ProfessionalCountOutputTypeCountOrdersArgs
    portfolio?: boolean | ProfessionalCountOutputTypeCountPortfolioArgs
    testimonials?: boolean | ProfessionalCountOutputTypeCountTestimonialsArgs
    appointments?: boolean | ProfessionalCountOutputTypeCountAppointmentsArgs
    certifications?: boolean | ProfessionalCountOutputTypeCountCertificationsArgs
  }

  // Custom InputTypes
  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCountOutputType
     */
    select?: ProfessionalCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountCategoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalCategoryWhereInput
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountPortfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioItemWhereInput
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountTestimonialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestimonialWhereInput
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }

  /**
   * ProfessionalCountOutputType without action
   */
  export type ProfessionalCountOutputTypeCountCertificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificationWhereInput
  }


  /**
   * Count Type CategoryCountOutputType
   */

  export type CategoryCountOutputType = {
    professionals: number
    services: number
    orders: number
    portfolio: number
  }

  export type CategoryCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professionals?: boolean | CategoryCountOutputTypeCountProfessionalsArgs
    services?: boolean | CategoryCountOutputTypeCountServicesArgs
    orders?: boolean | CategoryCountOutputTypeCountOrdersArgs
    portfolio?: boolean | CategoryCountOutputTypeCountPortfolioArgs
  }

  // Custom InputTypes
  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the CategoryCountOutputType
     */
    select?: CategoryCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountProfessionalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalCategoryWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountServicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }

  /**
   * CategoryCountOutputType without action
   */
  export type CategoryCountOutputTypeCountPortfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioItemWhereInput
  }


  /**
   * Count Type ServiceCountOutputType
   */

  export type ServiceCountOutputType = {
    orders: number
  }

  export type ServiceCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    orders?: boolean | ServiceCountOutputTypeCountOrdersArgs
  }

  // Custom InputTypes
  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ServiceCountOutputType
     */
    select?: ServiceCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ServiceCountOutputType without action
   */
  export type ServiceCountOutputTypeCountOrdersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
  }


  /**
   * Count Type OrderCountOutputType
   */

  export type OrderCountOutputType = {
    appointments: number
  }

  export type OrderCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    appointments?: boolean | OrderCountOutputTypeCountAppointmentsArgs
  }

  // Custom InputTypes
  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the OrderCountOutputType
     */
    select?: OrderCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * OrderCountOutputType without action
   */
  export type OrderCountOutputTypeCountAppointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    password: string | null
    phone: string | null
    avatarUrl: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    password: number
    phone: number
    avatarUrl: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    password?: true
    phone?: true
    avatarUrl?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    password: string
    phone: string | null
    avatarUrl: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | User$clientArgs<ExtArgs>
    professional?: boolean | User$professionalArgs<ExtArgs>
    testimonials?: boolean | User$testimonialsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type UserSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    password?: boolean
    phone?: boolean
    avatarUrl?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "password" | "phone" | "avatarUrl" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | User$clientArgs<ExtArgs>
    professional?: boolean | User$professionalArgs<ExtArgs>
    testimonials?: boolean | User$testimonialsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs> | null
      professional: Prisma.$ProfessionalPayload<ExtArgs> | null
      testimonials: Prisma.$TestimonialPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      password: string
      phone: string | null
      avatarUrl: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends User$clientArgs<ExtArgs> = {}>(args?: Subset<T, User$clientArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    professional<T extends User$professionalArgs<ExtArgs> = {}>(args?: Subset<T, User$professionalArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    testimonials<T extends User$testimonialsArgs<ExtArgs> = {}>(args?: Subset<T, User$testimonialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly name: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly password: FieldRef<"User", 'String'>
    readonly phone: FieldRef<"User", 'String'>
    readonly avatarUrl: FieldRef<"User", 'String'>
    readonly createdAt: FieldRef<"User", 'DateTime'>
    readonly updatedAt: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.client
   */
  export type User$clientArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    where?: ClientWhereInput
  }

  /**
   * User.professional
   */
  export type User$professionalArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    where?: ProfessionalWhereInput
  }

  /**
   * User.testimonials
   */
  export type User$testimonialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    where?: TestimonialWhereInput
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    cursor?: TestimonialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Client
   */

  export type AggregateClient = {
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  export type ClientMinAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type ClientMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    createdAt: Date | null
  }

  export type ClientCountAggregateOutputType = {
    id: number
    userId: number
    createdAt: number
    _all: number
  }


  export type ClientMinAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
  }

  export type ClientMaxAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
  }

  export type ClientCountAggregateInputType = {
    id?: true
    userId?: true
    createdAt?: true
    _all?: true
  }

  export type ClientAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Client to aggregate.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Clients
    **/
    _count?: true | ClientCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ClientMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ClientMaxAggregateInputType
  }

  export type GetClientAggregateType<T extends ClientAggregateArgs> = {
        [P in keyof T & keyof AggregateClient]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateClient[P]>
      : GetScalarType<T[P], AggregateClient[P]>
  }




  export type ClientGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ClientWhereInput
    orderBy?: ClientOrderByWithAggregationInput | ClientOrderByWithAggregationInput[]
    by: ClientScalarFieldEnum[] | ClientScalarFieldEnum
    having?: ClientScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ClientCountAggregateInputType | true
    _min?: ClientMinAggregateInputType
    _max?: ClientMaxAggregateInputType
  }

  export type ClientGroupByOutputType = {
    id: string
    userId: string
    createdAt: Date
    _count: ClientCountAggregateOutputType | null
    _min: ClientMinAggregateOutputType | null
    _max: ClientMaxAggregateOutputType | null
  }

  type GetClientGroupByPayload<T extends ClientGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ClientGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ClientGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ClientGroupByOutputType[P]>
            : GetScalarType<T[P], ClientGroupByOutputType[P]>
        }
      >
    >


  export type ClientSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    createdAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    orders?: boolean | Client$ordersArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["client"]>



  export type ClientSelectScalar = {
    id?: boolean
    userId?: boolean
    createdAt?: boolean
  }

  export type ClientOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "createdAt", ExtArgs["result"]["client"]>
  export type ClientInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    orders?: boolean | Client$ordersArgs<ExtArgs>
    _count?: boolean | ClientCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ClientPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Client"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      createdAt: Date
    }, ExtArgs["result"]["client"]>
    composites: {}
  }

  type ClientGetPayload<S extends boolean | null | undefined | ClientDefaultArgs> = $Result.GetResult<Prisma.$ClientPayload, S>

  type ClientCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ClientFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ClientCountAggregateInputType | true
    }

  export interface ClientDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Client'], meta: { name: 'Client' } }
    /**
     * Find zero or one Client that matches the filter.
     * @param {ClientFindUniqueArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ClientFindUniqueArgs>(args: SelectSubset<T, ClientFindUniqueArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Client that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ClientFindUniqueOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ClientFindUniqueOrThrowArgs>(args: SelectSubset<T, ClientFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ClientFindFirstArgs>(args?: SelectSubset<T, ClientFindFirstArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Client that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindFirstOrThrowArgs} args - Arguments to find a Client
     * @example
     * // Get one Client
     * const client = await prisma.client.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ClientFindFirstOrThrowArgs>(args?: SelectSubset<T, ClientFindFirstOrThrowArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Clients that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Clients
     * const clients = await prisma.client.findMany()
     * 
     * // Get first 10 Clients
     * const clients = await prisma.client.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const clientWithIdOnly = await prisma.client.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ClientFindManyArgs>(args?: SelectSubset<T, ClientFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Client.
     * @param {ClientCreateArgs} args - Arguments to create a Client.
     * @example
     * // Create one Client
     * const Client = await prisma.client.create({
     *   data: {
     *     // ... data to create a Client
     *   }
     * })
     * 
     */
    create<T extends ClientCreateArgs>(args: SelectSubset<T, ClientCreateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Clients.
     * @param {ClientCreateManyArgs} args - Arguments to create many Clients.
     * @example
     * // Create many Clients
     * const client = await prisma.client.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ClientCreateManyArgs>(args?: SelectSubset<T, ClientCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Client.
     * @param {ClientDeleteArgs} args - Arguments to delete one Client.
     * @example
     * // Delete one Client
     * const Client = await prisma.client.delete({
     *   where: {
     *     // ... filter to delete one Client
     *   }
     * })
     * 
     */
    delete<T extends ClientDeleteArgs>(args: SelectSubset<T, ClientDeleteArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Client.
     * @param {ClientUpdateArgs} args - Arguments to update one Client.
     * @example
     * // Update one Client
     * const client = await prisma.client.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ClientUpdateArgs>(args: SelectSubset<T, ClientUpdateArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Clients.
     * @param {ClientDeleteManyArgs} args - Arguments to filter Clients to delete.
     * @example
     * // Delete a few Clients
     * const { count } = await prisma.client.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ClientDeleteManyArgs>(args?: SelectSubset<T, ClientDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Clients
     * const client = await prisma.client.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ClientUpdateManyArgs>(args: SelectSubset<T, ClientUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Client.
     * @param {ClientUpsertArgs} args - Arguments to update or create a Client.
     * @example
     * // Update or create a Client
     * const client = await prisma.client.upsert({
     *   create: {
     *     // ... data to create a Client
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Client we want to update
     *   }
     * })
     */
    upsert<T extends ClientUpsertArgs>(args: SelectSubset<T, ClientUpsertArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Clients.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientCountArgs} args - Arguments to filter Clients to count.
     * @example
     * // Count the number of Clients
     * const count = await prisma.client.count({
     *   where: {
     *     // ... the filter for the Clients we want to count
     *   }
     * })
    **/
    count<T extends ClientCountArgs>(
      args?: Subset<T, ClientCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ClientCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ClientAggregateArgs>(args: Subset<T, ClientAggregateArgs>): Prisma.PrismaPromise<GetClientAggregateType<T>>

    /**
     * Group by Client.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ClientGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ClientGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ClientGroupByArgs['orderBy'] }
        : { orderBy?: ClientGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ClientGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetClientGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Client model
   */
  readonly fields: ClientFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Client.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ClientClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    orders<T extends Client$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Client$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Client model
   */
  interface ClientFieldRefs {
    readonly id: FieldRef<"Client", 'String'>
    readonly userId: FieldRef<"Client", 'String'>
    readonly createdAt: FieldRef<"Client", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Client findUnique
   */
  export type ClientFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findUniqueOrThrow
   */
  export type ClientFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client findFirst
   */
  export type ClientFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findFirstOrThrow
   */
  export type ClientFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Client to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client findMany
   */
  export type ClientFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter, which Clients to fetch.
     */
    where?: ClientWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Clients to fetch.
     */
    orderBy?: ClientOrderByWithRelationInput | ClientOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Clients.
     */
    cursor?: ClientWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Clients from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Clients.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Clients.
     */
    distinct?: ClientScalarFieldEnum | ClientScalarFieldEnum[]
  }

  /**
   * Client create
   */
  export type ClientCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to create a Client.
     */
    data: XOR<ClientCreateInput, ClientUncheckedCreateInput>
  }

  /**
   * Client createMany
   */
  export type ClientCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Clients.
     */
    data: ClientCreateManyInput | ClientCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Client update
   */
  export type ClientUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The data needed to update a Client.
     */
    data: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
    /**
     * Choose, which Client to update.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client updateMany
   */
  export type ClientUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Clients.
     */
    data: XOR<ClientUpdateManyMutationInput, ClientUncheckedUpdateManyInput>
    /**
     * Filter which Clients to update
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to update.
     */
    limit?: number
  }

  /**
   * Client upsert
   */
  export type ClientUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * The filter to search for the Client to update in case it exists.
     */
    where: ClientWhereUniqueInput
    /**
     * In case the Client found by the `where` argument doesn't exist, create a new Client with this data.
     */
    create: XOR<ClientCreateInput, ClientUncheckedCreateInput>
    /**
     * In case the Client was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ClientUpdateInput, ClientUncheckedUpdateInput>
  }

  /**
   * Client delete
   */
  export type ClientDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
    /**
     * Filter which Client to delete.
     */
    where: ClientWhereUniqueInput
  }

  /**
   * Client deleteMany
   */
  export type ClientDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Clients to delete
     */
    where?: ClientWhereInput
    /**
     * Limit how many Clients to delete.
     */
    limit?: number
  }

  /**
   * Client.orders
   */
  export type Client$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Client without action
   */
  export type ClientDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Client
     */
    select?: ClientSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Client
     */
    omit?: ClientOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ClientInclude<ExtArgs> | null
  }


  /**
   * Model Professional
   */

  export type AggregateProfessional = {
    _count: ProfessionalCountAggregateOutputType | null
    _avg: ProfessionalAvgAggregateOutputType | null
    _sum: ProfessionalSumAggregateOutputType | null
    _min: ProfessionalMinAggregateOutputType | null
    _max: ProfessionalMaxAggregateOutputType | null
  }

  export type ProfessionalAvgAggregateOutputType = {
    rating: Decimal | null
    reviewCount: number | null
  }

  export type ProfessionalSumAggregateOutputType = {
    rating: Decimal | null
    reviewCount: number | null
  }

  export type ProfessionalMinAggregateOutputType = {
    id: string | null
    userId: string | null
    specialty: string | null
    bio: string | null
    phone: string | null
    location: string | null
    addressStreet: string | null
    addressNumber: string | null
    addressComplement: string | null
    addressNeighborhood: string | null
    addressCity: string | null
    addressState: string | null
    addressCep: string | null
    cpf: string | null
    isVerified: boolean | null
    isAvailable: boolean | null
    rating: Decimal | null
    reviewCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    specialty: string | null
    bio: string | null
    phone: string | null
    location: string | null
    addressStreet: string | null
    addressNumber: string | null
    addressComplement: string | null
    addressNeighborhood: string | null
    addressCity: string | null
    addressState: string | null
    addressCep: string | null
    cpf: string | null
    isVerified: boolean | null
    isAvailable: boolean | null
    rating: Decimal | null
    reviewCount: number | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ProfessionalCountAggregateOutputType = {
    id: number
    userId: number
    specialty: number
    bio: number
    phone: number
    location: number
    addressStreet: number
    addressNumber: number
    addressComplement: number
    addressNeighborhood: number
    addressCity: number
    addressState: number
    addressCep: number
    cpf: number
    isVerified: number
    isAvailable: number
    rating: number
    reviewCount: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ProfessionalAvgAggregateInputType = {
    rating?: true
    reviewCount?: true
  }

  export type ProfessionalSumAggregateInputType = {
    rating?: true
    reviewCount?: true
  }

  export type ProfessionalMinAggregateInputType = {
    id?: true
    userId?: true
    specialty?: true
    bio?: true
    phone?: true
    location?: true
    addressStreet?: true
    addressNumber?: true
    addressComplement?: true
    addressNeighborhood?: true
    addressCity?: true
    addressState?: true
    addressCep?: true
    cpf?: true
    isVerified?: true
    isAvailable?: true
    rating?: true
    reviewCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalMaxAggregateInputType = {
    id?: true
    userId?: true
    specialty?: true
    bio?: true
    phone?: true
    location?: true
    addressStreet?: true
    addressNumber?: true
    addressComplement?: true
    addressNeighborhood?: true
    addressCity?: true
    addressState?: true
    addressCep?: true
    cpf?: true
    isVerified?: true
    isAvailable?: true
    rating?: true
    reviewCount?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ProfessionalCountAggregateInputType = {
    id?: true
    userId?: true
    specialty?: true
    bio?: true
    phone?: true
    location?: true
    addressStreet?: true
    addressNumber?: true
    addressComplement?: true
    addressNeighborhood?: true
    addressCity?: true
    addressState?: true
    addressCep?: true
    cpf?: true
    isVerified?: true
    isAvailable?: true
    rating?: true
    reviewCount?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ProfessionalAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Professional to aggregate.
     */
    where?: ProfessionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professionals to fetch.
     */
    orderBy?: ProfessionalOrderByWithRelationInput | ProfessionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Professionals
    **/
    _count?: true | ProfessionalCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ProfessionalAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ProfessionalSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalMaxAggregateInputType
  }

  export type GetProfessionalAggregateType<T extends ProfessionalAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessional]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessional[P]>
      : GetScalarType<T[P], AggregateProfessional[P]>
  }




  export type ProfessionalGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalWhereInput
    orderBy?: ProfessionalOrderByWithAggregationInput | ProfessionalOrderByWithAggregationInput[]
    by: ProfessionalScalarFieldEnum[] | ProfessionalScalarFieldEnum
    having?: ProfessionalScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalCountAggregateInputType | true
    _avg?: ProfessionalAvgAggregateInputType
    _sum?: ProfessionalSumAggregateInputType
    _min?: ProfessionalMinAggregateInputType
    _max?: ProfessionalMaxAggregateInputType
  }

  export type ProfessionalGroupByOutputType = {
    id: string
    userId: string
    specialty: string | null
    bio: string | null
    phone: string | null
    location: string | null
    addressStreet: string | null
    addressNumber: string | null
    addressComplement: string | null
    addressNeighborhood: string | null
    addressCity: string | null
    addressState: string | null
    addressCep: string | null
    cpf: string | null
    isVerified: boolean
    isAvailable: boolean
    rating: Decimal
    reviewCount: number
    createdAt: Date
    updatedAt: Date
    _count: ProfessionalCountAggregateOutputType | null
    _avg: ProfessionalAvgAggregateOutputType | null
    _sum: ProfessionalSumAggregateOutputType | null
    _min: ProfessionalMinAggregateOutputType | null
    _max: ProfessionalMaxAggregateOutputType | null
  }

  type GetProfessionalGroupByPayload<T extends ProfessionalGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    specialty?: boolean
    bio?: boolean
    phone?: boolean
    location?: boolean
    addressStreet?: boolean
    addressNumber?: boolean
    addressComplement?: boolean
    addressNeighborhood?: boolean
    addressCity?: boolean
    addressState?: boolean
    addressCep?: boolean
    cpf?: boolean
    isVerified?: boolean
    isAvailable?: boolean
    rating?: boolean
    reviewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
    categories?: boolean | Professional$categoriesArgs<ExtArgs>
    services?: boolean | Professional$servicesArgs<ExtArgs>
    orders?: boolean | Professional$ordersArgs<ExtArgs>
    portfolio?: boolean | Professional$portfolioArgs<ExtArgs>
    testimonials?: boolean | Professional$testimonialsArgs<ExtArgs>
    appointments?: boolean | Professional$appointmentsArgs<ExtArgs>
    certifications?: boolean | Professional$certificationsArgs<ExtArgs>
    _count?: boolean | ProfessionalCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professional"]>



  export type ProfessionalSelectScalar = {
    id?: boolean
    userId?: boolean
    specialty?: boolean
    bio?: boolean
    phone?: boolean
    location?: boolean
    addressStreet?: boolean
    addressNumber?: boolean
    addressComplement?: boolean
    addressNeighborhood?: boolean
    addressCity?: boolean
    addressState?: boolean
    addressCep?: boolean
    cpf?: boolean
    isVerified?: boolean
    isAvailable?: boolean
    rating?: boolean
    reviewCount?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ProfessionalOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "specialty" | "bio" | "phone" | "location" | "addressStreet" | "addressNumber" | "addressComplement" | "addressNeighborhood" | "addressCity" | "addressState" | "addressCep" | "cpf" | "isVerified" | "isAvailable" | "rating" | "reviewCount" | "createdAt" | "updatedAt", ExtArgs["result"]["professional"]>
  export type ProfessionalInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
    categories?: boolean | Professional$categoriesArgs<ExtArgs>
    services?: boolean | Professional$servicesArgs<ExtArgs>
    orders?: boolean | Professional$ordersArgs<ExtArgs>
    portfolio?: boolean | Professional$portfolioArgs<ExtArgs>
    testimonials?: boolean | Professional$testimonialsArgs<ExtArgs>
    appointments?: boolean | Professional$appointmentsArgs<ExtArgs>
    certifications?: boolean | Professional$certificationsArgs<ExtArgs>
    _count?: boolean | ProfessionalCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ProfessionalPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Professional"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
      categories: Prisma.$ProfessionalCategoryPayload<ExtArgs>[]
      services: Prisma.$ServicePayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      portfolio: Prisma.$PortfolioItemPayload<ExtArgs>[]
      testimonials: Prisma.$TestimonialPayload<ExtArgs>[]
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
      certifications: Prisma.$CertificationPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      specialty: string | null
      bio: string | null
      phone: string | null
      location: string | null
      addressStreet: string | null
      addressNumber: string | null
      addressComplement: string | null
      addressNeighborhood: string | null
      addressCity: string | null
      addressState: string | null
      addressCep: string | null
      cpf: string | null
      isVerified: boolean
      isAvailable: boolean
      rating: Prisma.Decimal
      reviewCount: number
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["professional"]>
    composites: {}
  }

  type ProfessionalGetPayload<S extends boolean | null | undefined | ProfessionalDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalPayload, S>

  type ProfessionalCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalCountAggregateInputType | true
    }

  export interface ProfessionalDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Professional'], meta: { name: 'Professional' } }
    /**
     * Find zero or one Professional that matches the filter.
     * @param {ProfessionalFindUniqueArgs} args - Arguments to find a Professional
     * @example
     * // Get one Professional
     * const professional = await prisma.professional.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalFindUniqueArgs>(args: SelectSubset<T, ProfessionalFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Professional that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalFindUniqueOrThrowArgs} args - Arguments to find a Professional
     * @example
     * // Get one Professional
     * const professional = await prisma.professional.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Professional that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalFindFirstArgs} args - Arguments to find a Professional
     * @example
     * // Get one Professional
     * const professional = await prisma.professional.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalFindFirstArgs>(args?: SelectSubset<T, ProfessionalFindFirstArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Professional that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalFindFirstOrThrowArgs} args - Arguments to find a Professional
     * @example
     * // Get one Professional
     * const professional = await prisma.professional.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Professionals that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Professionals
     * const professionals = await prisma.professional.findMany()
     * 
     * // Get first 10 Professionals
     * const professionals = await prisma.professional.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const professionalWithIdOnly = await prisma.professional.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ProfessionalFindManyArgs>(args?: SelectSubset<T, ProfessionalFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Professional.
     * @param {ProfessionalCreateArgs} args - Arguments to create a Professional.
     * @example
     * // Create one Professional
     * const Professional = await prisma.professional.create({
     *   data: {
     *     // ... data to create a Professional
     *   }
     * })
     * 
     */
    create<T extends ProfessionalCreateArgs>(args: SelectSubset<T, ProfessionalCreateArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Professionals.
     * @param {ProfessionalCreateManyArgs} args - Arguments to create many Professionals.
     * @example
     * // Create many Professionals
     * const professional = await prisma.professional.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalCreateManyArgs>(args?: SelectSubset<T, ProfessionalCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Professional.
     * @param {ProfessionalDeleteArgs} args - Arguments to delete one Professional.
     * @example
     * // Delete one Professional
     * const Professional = await prisma.professional.delete({
     *   where: {
     *     // ... filter to delete one Professional
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalDeleteArgs>(args: SelectSubset<T, ProfessionalDeleteArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Professional.
     * @param {ProfessionalUpdateArgs} args - Arguments to update one Professional.
     * @example
     * // Update one Professional
     * const professional = await prisma.professional.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalUpdateArgs>(args: SelectSubset<T, ProfessionalUpdateArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Professionals.
     * @param {ProfessionalDeleteManyArgs} args - Arguments to filter Professionals to delete.
     * @example
     * // Delete a few Professionals
     * const { count } = await prisma.professional.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalDeleteManyArgs>(args?: SelectSubset<T, ProfessionalDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Professionals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Professionals
     * const professional = await prisma.professional.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalUpdateManyArgs>(args: SelectSubset<T, ProfessionalUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Professional.
     * @param {ProfessionalUpsertArgs} args - Arguments to update or create a Professional.
     * @example
     * // Update or create a Professional
     * const professional = await prisma.professional.upsert({
     *   create: {
     *     // ... data to create a Professional
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Professional we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalUpsertArgs>(args: SelectSubset<T, ProfessionalUpsertArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Professionals.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCountArgs} args - Arguments to filter Professionals to count.
     * @example
     * // Count the number of Professionals
     * const count = await prisma.professional.count({
     *   where: {
     *     // ... the filter for the Professionals we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalCountArgs>(
      args?: Subset<T, ProfessionalCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Professional.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalAggregateArgs>(args: Subset<T, ProfessionalAggregateArgs>): Prisma.PrismaPromise<GetProfessionalAggregateType<T>>

    /**
     * Group by Professional.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Professional model
   */
  readonly fields: ProfessionalFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Professional.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    categories<T extends Professional$categoriesArgs<ExtArgs> = {}>(args?: Subset<T, Professional$categoriesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    services<T extends Professional$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Professional$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Professional$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Professional$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    portfolio<T extends Professional$portfolioArgs<ExtArgs> = {}>(args?: Subset<T, Professional$portfolioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    testimonials<T extends Professional$testimonialsArgs<ExtArgs> = {}>(args?: Subset<T, Professional$testimonialsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    appointments<T extends Professional$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Professional$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    certifications<T extends Professional$certificationsArgs<ExtArgs> = {}>(args?: Subset<T, Professional$certificationsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Professional model
   */
  interface ProfessionalFieldRefs {
    readonly id: FieldRef<"Professional", 'String'>
    readonly userId: FieldRef<"Professional", 'String'>
    readonly specialty: FieldRef<"Professional", 'String'>
    readonly bio: FieldRef<"Professional", 'String'>
    readonly phone: FieldRef<"Professional", 'String'>
    readonly location: FieldRef<"Professional", 'String'>
    readonly addressStreet: FieldRef<"Professional", 'String'>
    readonly addressNumber: FieldRef<"Professional", 'String'>
    readonly addressComplement: FieldRef<"Professional", 'String'>
    readonly addressNeighborhood: FieldRef<"Professional", 'String'>
    readonly addressCity: FieldRef<"Professional", 'String'>
    readonly addressState: FieldRef<"Professional", 'String'>
    readonly addressCep: FieldRef<"Professional", 'String'>
    readonly cpf: FieldRef<"Professional", 'String'>
    readonly isVerified: FieldRef<"Professional", 'Boolean'>
    readonly isAvailable: FieldRef<"Professional", 'Boolean'>
    readonly rating: FieldRef<"Professional", 'Decimal'>
    readonly reviewCount: FieldRef<"Professional", 'Int'>
    readonly createdAt: FieldRef<"Professional", 'DateTime'>
    readonly updatedAt: FieldRef<"Professional", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Professional findUnique
   */
  export type ProfessionalFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which Professional to fetch.
     */
    where: ProfessionalWhereUniqueInput
  }

  /**
   * Professional findUniqueOrThrow
   */
  export type ProfessionalFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which Professional to fetch.
     */
    where: ProfessionalWhereUniqueInput
  }

  /**
   * Professional findFirst
   */
  export type ProfessionalFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which Professional to fetch.
     */
    where?: ProfessionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professionals to fetch.
     */
    orderBy?: ProfessionalOrderByWithRelationInput | ProfessionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professionals.
     */
    cursor?: ProfessionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professionals.
     */
    distinct?: ProfessionalScalarFieldEnum | ProfessionalScalarFieldEnum[]
  }

  /**
   * Professional findFirstOrThrow
   */
  export type ProfessionalFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which Professional to fetch.
     */
    where?: ProfessionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professionals to fetch.
     */
    orderBy?: ProfessionalOrderByWithRelationInput | ProfessionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Professionals.
     */
    cursor?: ProfessionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professionals.
     */
    distinct?: ProfessionalScalarFieldEnum | ProfessionalScalarFieldEnum[]
  }

  /**
   * Professional findMany
   */
  export type ProfessionalFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * Filter, which Professionals to fetch.
     */
    where?: ProfessionalWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Professionals to fetch.
     */
    orderBy?: ProfessionalOrderByWithRelationInput | ProfessionalOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Professionals.
     */
    cursor?: ProfessionalWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Professionals from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Professionals.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Professionals.
     */
    distinct?: ProfessionalScalarFieldEnum | ProfessionalScalarFieldEnum[]
  }

  /**
   * Professional create
   */
  export type ProfessionalCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * The data needed to create a Professional.
     */
    data: XOR<ProfessionalCreateInput, ProfessionalUncheckedCreateInput>
  }

  /**
   * Professional createMany
   */
  export type ProfessionalCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Professionals.
     */
    data: ProfessionalCreateManyInput | ProfessionalCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Professional update
   */
  export type ProfessionalUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * The data needed to update a Professional.
     */
    data: XOR<ProfessionalUpdateInput, ProfessionalUncheckedUpdateInput>
    /**
     * Choose, which Professional to update.
     */
    where: ProfessionalWhereUniqueInput
  }

  /**
   * Professional updateMany
   */
  export type ProfessionalUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Professionals.
     */
    data: XOR<ProfessionalUpdateManyMutationInput, ProfessionalUncheckedUpdateManyInput>
    /**
     * Filter which Professionals to update
     */
    where?: ProfessionalWhereInput
    /**
     * Limit how many Professionals to update.
     */
    limit?: number
  }

  /**
   * Professional upsert
   */
  export type ProfessionalUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * The filter to search for the Professional to update in case it exists.
     */
    where: ProfessionalWhereUniqueInput
    /**
     * In case the Professional found by the `where` argument doesn't exist, create a new Professional with this data.
     */
    create: XOR<ProfessionalCreateInput, ProfessionalUncheckedCreateInput>
    /**
     * In case the Professional was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalUpdateInput, ProfessionalUncheckedUpdateInput>
  }

  /**
   * Professional delete
   */
  export type ProfessionalDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
    /**
     * Filter which Professional to delete.
     */
    where: ProfessionalWhereUniqueInput
  }

  /**
   * Professional deleteMany
   */
  export type ProfessionalDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Professionals to delete
     */
    where?: ProfessionalWhereInput
    /**
     * Limit how many Professionals to delete.
     */
    limit?: number
  }

  /**
   * Professional.categories
   */
  export type Professional$categoriesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCategory
     */
    select?: ProfessionalCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCategory
     */
    omit?: ProfessionalCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCategoryInclude<ExtArgs> | null
    where?: ProfessionalCategoryWhereInput
    orderBy?: ProfessionalCategoryOrderByWithRelationInput | ProfessionalCategoryOrderByWithRelationInput[]
    cursor?: ProfessionalCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalCategoryScalarFieldEnum | ProfessionalCategoryScalarFieldEnum[]
  }

  /**
   * Professional.services
   */
  export type Professional$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Professional.orders
   */
  export type Professional$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Professional.portfolio
   */
  export type Professional$portfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    where?: PortfolioItemWhereInput
    orderBy?: PortfolioItemOrderByWithRelationInput | PortfolioItemOrderByWithRelationInput[]
    cursor?: PortfolioItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioItemScalarFieldEnum | PortfolioItemScalarFieldEnum[]
  }

  /**
   * Professional.testimonials
   */
  export type Professional$testimonialsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    where?: TestimonialWhereInput
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    cursor?: TestimonialWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Professional.appointments
   */
  export type Professional$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Professional.certifications
   */
  export type Professional$certificationsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    where?: CertificationWhereInput
    orderBy?: CertificationOrderByWithRelationInput | CertificationOrderByWithRelationInput[]
    cursor?: CertificationWhereUniqueInput
    take?: number
    skip?: number
    distinct?: CertificationScalarFieldEnum | CertificationScalarFieldEnum[]
  }

  /**
   * Professional without action
   */
  export type ProfessionalDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Professional
     */
    select?: ProfessionalSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Professional
     */
    omit?: ProfessionalOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalInclude<ExtArgs> | null
  }


  /**
   * Model Category
   */

  export type AggregateCategory = {
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  export type CategoryMinAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
  }

  export type CategoryMaxAggregateOutputType = {
    id: string | null
    name: string | null
    slug: string | null
    description: string | null
    createdAt: Date | null
  }

  export type CategoryCountAggregateOutputType = {
    id: number
    name: number
    slug: number
    description: number
    createdAt: number
    _all: number
  }


  export type CategoryMinAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
  }

  export type CategoryMaxAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
  }

  export type CategoryCountAggregateInputType = {
    id?: true
    name?: true
    slug?: true
    description?: true
    createdAt?: true
    _all?: true
  }

  export type CategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Category to aggregate.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Categories
    **/
    _count?: true | CategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CategoryMaxAggregateInputType
  }

  export type GetCategoryAggregateType<T extends CategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCategory[P]>
      : GetScalarType<T[P], AggregateCategory[P]>
  }




  export type CategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CategoryWhereInput
    orderBy?: CategoryOrderByWithAggregationInput | CategoryOrderByWithAggregationInput[]
    by: CategoryScalarFieldEnum[] | CategoryScalarFieldEnum
    having?: CategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CategoryCountAggregateInputType | true
    _min?: CategoryMinAggregateInputType
    _max?: CategoryMaxAggregateInputType
  }

  export type CategoryGroupByOutputType = {
    id: string
    name: string
    slug: string
    description: string | null
    createdAt: Date
    _count: CategoryCountAggregateOutputType | null
    _min: CategoryMinAggregateOutputType | null
    _max: CategoryMaxAggregateOutputType | null
  }

  type GetCategoryGroupByPayload<T extends CategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CategoryGroupByOutputType[P]>
            : GetScalarType<T[P], CategoryGroupByOutputType[P]>
        }
      >
    >


  export type CategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
    professionals?: boolean | Category$professionalsArgs<ExtArgs>
    services?: boolean | Category$servicesArgs<ExtArgs>
    orders?: boolean | Category$ordersArgs<ExtArgs>
    portfolio?: boolean | Category$portfolioArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["category"]>



  export type CategorySelectScalar = {
    id?: boolean
    name?: boolean
    slug?: boolean
    description?: boolean
    createdAt?: boolean
  }

  export type CategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "slug" | "description" | "createdAt", ExtArgs["result"]["category"]>
  export type CategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professionals?: boolean | Category$professionalsArgs<ExtArgs>
    services?: boolean | Category$servicesArgs<ExtArgs>
    orders?: boolean | Category$ordersArgs<ExtArgs>
    portfolio?: boolean | Category$portfolioArgs<ExtArgs>
    _count?: boolean | CategoryCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $CategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Category"
    objects: {
      professionals: Prisma.$ProfessionalCategoryPayload<ExtArgs>[]
      services: Prisma.$ServicePayload<ExtArgs>[]
      orders: Prisma.$OrderPayload<ExtArgs>[]
      portfolio: Prisma.$PortfolioItemPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      slug: string
      description: string | null
      createdAt: Date
    }, ExtArgs["result"]["category"]>
    composites: {}
  }

  type CategoryGetPayload<S extends boolean | null | undefined | CategoryDefaultArgs> = $Result.GetResult<Prisma.$CategoryPayload, S>

  type CategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CategoryCountAggregateInputType | true
    }

  export interface CategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Category'], meta: { name: 'Category' } }
    /**
     * Find zero or one Category that matches the filter.
     * @param {CategoryFindUniqueArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CategoryFindUniqueArgs>(args: SelectSubset<T, CategoryFindUniqueArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Category that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CategoryFindUniqueOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, CategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CategoryFindFirstArgs>(args?: SelectSubset<T, CategoryFindFirstArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Category that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindFirstOrThrowArgs} args - Arguments to find a Category
     * @example
     * // Get one Category
     * const category = await prisma.category.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, CategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Categories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Categories
     * const categories = await prisma.category.findMany()
     * 
     * // Get first 10 Categories
     * const categories = await prisma.category.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const categoryWithIdOnly = await prisma.category.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CategoryFindManyArgs>(args?: SelectSubset<T, CategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Category.
     * @param {CategoryCreateArgs} args - Arguments to create a Category.
     * @example
     * // Create one Category
     * const Category = await prisma.category.create({
     *   data: {
     *     // ... data to create a Category
     *   }
     * })
     * 
     */
    create<T extends CategoryCreateArgs>(args: SelectSubset<T, CategoryCreateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Categories.
     * @param {CategoryCreateManyArgs} args - Arguments to create many Categories.
     * @example
     * // Create many Categories
     * const category = await prisma.category.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CategoryCreateManyArgs>(args?: SelectSubset<T, CategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Category.
     * @param {CategoryDeleteArgs} args - Arguments to delete one Category.
     * @example
     * // Delete one Category
     * const Category = await prisma.category.delete({
     *   where: {
     *     // ... filter to delete one Category
     *   }
     * })
     * 
     */
    delete<T extends CategoryDeleteArgs>(args: SelectSubset<T, CategoryDeleteArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Category.
     * @param {CategoryUpdateArgs} args - Arguments to update one Category.
     * @example
     * // Update one Category
     * const category = await prisma.category.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CategoryUpdateArgs>(args: SelectSubset<T, CategoryUpdateArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Categories.
     * @param {CategoryDeleteManyArgs} args - Arguments to filter Categories to delete.
     * @example
     * // Delete a few Categories
     * const { count } = await prisma.category.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CategoryDeleteManyArgs>(args?: SelectSubset<T, CategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Categories
     * const category = await prisma.category.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CategoryUpdateManyArgs>(args: SelectSubset<T, CategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Category.
     * @param {CategoryUpsertArgs} args - Arguments to update or create a Category.
     * @example
     * // Update or create a Category
     * const category = await prisma.category.upsert({
     *   create: {
     *     // ... data to create a Category
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Category we want to update
     *   }
     * })
     */
    upsert<T extends CategoryUpsertArgs>(args: SelectSubset<T, CategoryUpsertArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Categories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryCountArgs} args - Arguments to filter Categories to count.
     * @example
     * // Count the number of Categories
     * const count = await prisma.category.count({
     *   where: {
     *     // ... the filter for the Categories we want to count
     *   }
     * })
    **/
    count<T extends CategoryCountArgs>(
      args?: Subset<T, CategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CategoryAggregateArgs>(args: Subset<T, CategoryAggregateArgs>): Prisma.PrismaPromise<GetCategoryAggregateType<T>>

    /**
     * Group by Category.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CategoryGroupByArgs['orderBy'] }
        : { orderBy?: CategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Category model
   */
  readonly fields: CategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Category.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professionals<T extends Category$professionalsArgs<ExtArgs> = {}>(args?: Subset<T, Category$professionalsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    services<T extends Category$servicesArgs<ExtArgs> = {}>(args?: Subset<T, Category$servicesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    orders<T extends Category$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Category$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    portfolio<T extends Category$portfolioArgs<ExtArgs> = {}>(args?: Subset<T, Category$portfolioArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Category model
   */
  interface CategoryFieldRefs {
    readonly id: FieldRef<"Category", 'String'>
    readonly name: FieldRef<"Category", 'String'>
    readonly slug: FieldRef<"Category", 'String'>
    readonly description: FieldRef<"Category", 'String'>
    readonly createdAt: FieldRef<"Category", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Category findUnique
   */
  export type CategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findUniqueOrThrow
   */
  export type CategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category findFirst
   */
  export type CategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findFirstOrThrow
   */
  export type CategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Category to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category findMany
   */
  export type CategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter, which Categories to fetch.
     */
    where?: CategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Categories to fetch.
     */
    orderBy?: CategoryOrderByWithRelationInput | CategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Categories.
     */
    cursor?: CategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Categories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Categories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Categories.
     */
    distinct?: CategoryScalarFieldEnum | CategoryScalarFieldEnum[]
  }

  /**
   * Category create
   */
  export type CategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a Category.
     */
    data: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
  }

  /**
   * Category createMany
   */
  export type CategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Categories.
     */
    data: CategoryCreateManyInput | CategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Category update
   */
  export type CategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a Category.
     */
    data: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
    /**
     * Choose, which Category to update.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category updateMany
   */
  export type CategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Categories.
     */
    data: XOR<CategoryUpdateManyMutationInput, CategoryUncheckedUpdateManyInput>
    /**
     * Filter which Categories to update
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to update.
     */
    limit?: number
  }

  /**
   * Category upsert
   */
  export type CategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the Category to update in case it exists.
     */
    where: CategoryWhereUniqueInput
    /**
     * In case the Category found by the `where` argument doesn't exist, create a new Category with this data.
     */
    create: XOR<CategoryCreateInput, CategoryUncheckedCreateInput>
    /**
     * In case the Category was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CategoryUpdateInput, CategoryUncheckedUpdateInput>
  }

  /**
   * Category delete
   */
  export type CategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    /**
     * Filter which Category to delete.
     */
    where: CategoryWhereUniqueInput
  }

  /**
   * Category deleteMany
   */
  export type CategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Categories to delete
     */
    where?: CategoryWhereInput
    /**
     * Limit how many Categories to delete.
     */
    limit?: number
  }

  /**
   * Category.professionals
   */
  export type Category$professionalsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCategory
     */
    select?: ProfessionalCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCategory
     */
    omit?: ProfessionalCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCategoryInclude<ExtArgs> | null
    where?: ProfessionalCategoryWhereInput
    orderBy?: ProfessionalCategoryOrderByWithRelationInput | ProfessionalCategoryOrderByWithRelationInput[]
    cursor?: ProfessionalCategoryWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ProfessionalCategoryScalarFieldEnum | ProfessionalCategoryScalarFieldEnum[]
  }

  /**
   * Category.services
   */
  export type Category$servicesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    cursor?: ServiceWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Category.orders
   */
  export type Category$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Category.portfolio
   */
  export type Category$portfolioArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    where?: PortfolioItemWhereInput
    orderBy?: PortfolioItemOrderByWithRelationInput | PortfolioItemOrderByWithRelationInput[]
    cursor?: PortfolioItemWhereUniqueInput
    take?: number
    skip?: number
    distinct?: PortfolioItemScalarFieldEnum | PortfolioItemScalarFieldEnum[]
  }

  /**
   * Category without action
   */
  export type CategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
  }


  /**
   * Model ProfessionalCategory
   */

  export type AggregateProfessionalCategory = {
    _count: ProfessionalCategoryCountAggregateOutputType | null
    _min: ProfessionalCategoryMinAggregateOutputType | null
    _max: ProfessionalCategoryMaxAggregateOutputType | null
  }

  export type ProfessionalCategoryMinAggregateOutputType = {
    professionalId: string | null
    categoryId: string | null
  }

  export type ProfessionalCategoryMaxAggregateOutputType = {
    professionalId: string | null
    categoryId: string | null
  }

  export type ProfessionalCategoryCountAggregateOutputType = {
    professionalId: number
    categoryId: number
    _all: number
  }


  export type ProfessionalCategoryMinAggregateInputType = {
    professionalId?: true
    categoryId?: true
  }

  export type ProfessionalCategoryMaxAggregateInputType = {
    professionalId?: true
    categoryId?: true
  }

  export type ProfessionalCategoryCountAggregateInputType = {
    professionalId?: true
    categoryId?: true
    _all?: true
  }

  export type ProfessionalCategoryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalCategory to aggregate.
     */
    where?: ProfessionalCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalCategories to fetch.
     */
    orderBy?: ProfessionalCategoryOrderByWithRelationInput | ProfessionalCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ProfessionalCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned ProfessionalCategories
    **/
    _count?: true | ProfessionalCategoryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ProfessionalCategoryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ProfessionalCategoryMaxAggregateInputType
  }

  export type GetProfessionalCategoryAggregateType<T extends ProfessionalCategoryAggregateArgs> = {
        [P in keyof T & keyof AggregateProfessionalCategory]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateProfessionalCategory[P]>
      : GetScalarType<T[P], AggregateProfessionalCategory[P]>
  }




  export type ProfessionalCategoryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ProfessionalCategoryWhereInput
    orderBy?: ProfessionalCategoryOrderByWithAggregationInput | ProfessionalCategoryOrderByWithAggregationInput[]
    by: ProfessionalCategoryScalarFieldEnum[] | ProfessionalCategoryScalarFieldEnum
    having?: ProfessionalCategoryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ProfessionalCategoryCountAggregateInputType | true
    _min?: ProfessionalCategoryMinAggregateInputType
    _max?: ProfessionalCategoryMaxAggregateInputType
  }

  export type ProfessionalCategoryGroupByOutputType = {
    professionalId: string
    categoryId: string
    _count: ProfessionalCategoryCountAggregateOutputType | null
    _min: ProfessionalCategoryMinAggregateOutputType | null
    _max: ProfessionalCategoryMaxAggregateOutputType | null
  }

  type GetProfessionalCategoryGroupByPayload<T extends ProfessionalCategoryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ProfessionalCategoryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ProfessionalCategoryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ProfessionalCategoryGroupByOutputType[P]>
            : GetScalarType<T[P], ProfessionalCategoryGroupByOutputType[P]>
        }
      >
    >


  export type ProfessionalCategorySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    professionalId?: boolean
    categoryId?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["professionalCategory"]>



  export type ProfessionalCategorySelectScalar = {
    professionalId?: boolean
    categoryId?: boolean
  }

  export type ProfessionalCategoryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"professionalId" | "categoryId", ExtArgs["result"]["professionalCategory"]>
  export type ProfessionalCategoryInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
    category?: boolean | CategoryDefaultArgs<ExtArgs>
  }

  export type $ProfessionalCategoryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "ProfessionalCategory"
    objects: {
      professional: Prisma.$ProfessionalPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      professionalId: string
      categoryId: string
    }, ExtArgs["result"]["professionalCategory"]>
    composites: {}
  }

  type ProfessionalCategoryGetPayload<S extends boolean | null | undefined | ProfessionalCategoryDefaultArgs> = $Result.GetResult<Prisma.$ProfessionalCategoryPayload, S>

  type ProfessionalCategoryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ProfessionalCategoryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ProfessionalCategoryCountAggregateInputType | true
    }

  export interface ProfessionalCategoryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['ProfessionalCategory'], meta: { name: 'ProfessionalCategory' } }
    /**
     * Find zero or one ProfessionalCategory that matches the filter.
     * @param {ProfessionalCategoryFindUniqueArgs} args - Arguments to find a ProfessionalCategory
     * @example
     * // Get one ProfessionalCategory
     * const professionalCategory = await prisma.professionalCategory.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ProfessionalCategoryFindUniqueArgs>(args: SelectSubset<T, ProfessionalCategoryFindUniqueArgs<ExtArgs>>): Prisma__ProfessionalCategoryClient<$Result.GetResult<Prisma.$ProfessionalCategoryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one ProfessionalCategory that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ProfessionalCategoryFindUniqueOrThrowArgs} args - Arguments to find a ProfessionalCategory
     * @example
     * // Get one ProfessionalCategory
     * const professionalCategory = await prisma.professionalCategory.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ProfessionalCategoryFindUniqueOrThrowArgs>(args: SelectSubset<T, ProfessionalCategoryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ProfessionalCategoryClient<$Result.GetResult<Prisma.$ProfessionalCategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalCategory that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCategoryFindFirstArgs} args - Arguments to find a ProfessionalCategory
     * @example
     * // Get one ProfessionalCategory
     * const professionalCategory = await prisma.professionalCategory.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ProfessionalCategoryFindFirstArgs>(args?: SelectSubset<T, ProfessionalCategoryFindFirstArgs<ExtArgs>>): Prisma__ProfessionalCategoryClient<$Result.GetResult<Prisma.$ProfessionalCategoryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first ProfessionalCategory that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCategoryFindFirstOrThrowArgs} args - Arguments to find a ProfessionalCategory
     * @example
     * // Get one ProfessionalCategory
     * const professionalCategory = await prisma.professionalCategory.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ProfessionalCategoryFindFirstOrThrowArgs>(args?: SelectSubset<T, ProfessionalCategoryFindFirstOrThrowArgs<ExtArgs>>): Prisma__ProfessionalCategoryClient<$Result.GetResult<Prisma.$ProfessionalCategoryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more ProfessionalCategories that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCategoryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ProfessionalCategories
     * const professionalCategories = await prisma.professionalCategory.findMany()
     * 
     * // Get first 10 ProfessionalCategories
     * const professionalCategories = await prisma.professionalCategory.findMany({ take: 10 })
     * 
     * // Only select the `professionalId`
     * const professionalCategoryWithProfessionalIdOnly = await prisma.professionalCategory.findMany({ select: { professionalId: true } })
     * 
     */
    findMany<T extends ProfessionalCategoryFindManyArgs>(args?: SelectSubset<T, ProfessionalCategoryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ProfessionalCategoryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a ProfessionalCategory.
     * @param {ProfessionalCategoryCreateArgs} args - Arguments to create a ProfessionalCategory.
     * @example
     * // Create one ProfessionalCategory
     * const ProfessionalCategory = await prisma.professionalCategory.create({
     *   data: {
     *     // ... data to create a ProfessionalCategory
     *   }
     * })
     * 
     */
    create<T extends ProfessionalCategoryCreateArgs>(args: SelectSubset<T, ProfessionalCategoryCreateArgs<ExtArgs>>): Prisma__ProfessionalCategoryClient<$Result.GetResult<Prisma.$ProfessionalCategoryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many ProfessionalCategories.
     * @param {ProfessionalCategoryCreateManyArgs} args - Arguments to create many ProfessionalCategories.
     * @example
     * // Create many ProfessionalCategories
     * const professionalCategory = await prisma.professionalCategory.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ProfessionalCategoryCreateManyArgs>(args?: SelectSubset<T, ProfessionalCategoryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a ProfessionalCategory.
     * @param {ProfessionalCategoryDeleteArgs} args - Arguments to delete one ProfessionalCategory.
     * @example
     * // Delete one ProfessionalCategory
     * const ProfessionalCategory = await prisma.professionalCategory.delete({
     *   where: {
     *     // ... filter to delete one ProfessionalCategory
     *   }
     * })
     * 
     */
    delete<T extends ProfessionalCategoryDeleteArgs>(args: SelectSubset<T, ProfessionalCategoryDeleteArgs<ExtArgs>>): Prisma__ProfessionalCategoryClient<$Result.GetResult<Prisma.$ProfessionalCategoryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one ProfessionalCategory.
     * @param {ProfessionalCategoryUpdateArgs} args - Arguments to update one ProfessionalCategory.
     * @example
     * // Update one ProfessionalCategory
     * const professionalCategory = await prisma.professionalCategory.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ProfessionalCategoryUpdateArgs>(args: SelectSubset<T, ProfessionalCategoryUpdateArgs<ExtArgs>>): Prisma__ProfessionalCategoryClient<$Result.GetResult<Prisma.$ProfessionalCategoryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more ProfessionalCategories.
     * @param {ProfessionalCategoryDeleteManyArgs} args - Arguments to filter ProfessionalCategories to delete.
     * @example
     * // Delete a few ProfessionalCategories
     * const { count } = await prisma.professionalCategory.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ProfessionalCategoryDeleteManyArgs>(args?: SelectSubset<T, ProfessionalCategoryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more ProfessionalCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCategoryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ProfessionalCategories
     * const professionalCategory = await prisma.professionalCategory.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ProfessionalCategoryUpdateManyArgs>(args: SelectSubset<T, ProfessionalCategoryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one ProfessionalCategory.
     * @param {ProfessionalCategoryUpsertArgs} args - Arguments to update or create a ProfessionalCategory.
     * @example
     * // Update or create a ProfessionalCategory
     * const professionalCategory = await prisma.professionalCategory.upsert({
     *   create: {
     *     // ... data to create a ProfessionalCategory
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ProfessionalCategory we want to update
     *   }
     * })
     */
    upsert<T extends ProfessionalCategoryUpsertArgs>(args: SelectSubset<T, ProfessionalCategoryUpsertArgs<ExtArgs>>): Prisma__ProfessionalCategoryClient<$Result.GetResult<Prisma.$ProfessionalCategoryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of ProfessionalCategories.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCategoryCountArgs} args - Arguments to filter ProfessionalCategories to count.
     * @example
     * // Count the number of ProfessionalCategories
     * const count = await prisma.professionalCategory.count({
     *   where: {
     *     // ... the filter for the ProfessionalCategories we want to count
     *   }
     * })
    **/
    count<T extends ProfessionalCategoryCountArgs>(
      args?: Subset<T, ProfessionalCategoryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ProfessionalCategoryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a ProfessionalCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCategoryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ProfessionalCategoryAggregateArgs>(args: Subset<T, ProfessionalCategoryAggregateArgs>): Prisma.PrismaPromise<GetProfessionalCategoryAggregateType<T>>

    /**
     * Group by ProfessionalCategory.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ProfessionalCategoryGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ProfessionalCategoryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ProfessionalCategoryGroupByArgs['orderBy'] }
        : { orderBy?: ProfessionalCategoryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ProfessionalCategoryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetProfessionalCategoryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the ProfessionalCategory model
   */
  readonly fields: ProfessionalCategoryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for ProfessionalCategory.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ProfessionalCategoryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends CategoryDefaultArgs<ExtArgs> = {}>(args?: Subset<T, CategoryDefaultArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the ProfessionalCategory model
   */
  interface ProfessionalCategoryFieldRefs {
    readonly professionalId: FieldRef<"ProfessionalCategory", 'String'>
    readonly categoryId: FieldRef<"ProfessionalCategory", 'String'>
  }
    

  // Custom InputTypes
  /**
   * ProfessionalCategory findUnique
   */
  export type ProfessionalCategoryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCategory
     */
    select?: ProfessionalCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCategory
     */
    omit?: ProfessionalCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalCategory to fetch.
     */
    where: ProfessionalCategoryWhereUniqueInput
  }

  /**
   * ProfessionalCategory findUniqueOrThrow
   */
  export type ProfessionalCategoryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCategory
     */
    select?: ProfessionalCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCategory
     */
    omit?: ProfessionalCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalCategory to fetch.
     */
    where: ProfessionalCategoryWhereUniqueInput
  }

  /**
   * ProfessionalCategory findFirst
   */
  export type ProfessionalCategoryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCategory
     */
    select?: ProfessionalCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCategory
     */
    omit?: ProfessionalCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalCategory to fetch.
     */
    where?: ProfessionalCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalCategories to fetch.
     */
    orderBy?: ProfessionalCategoryOrderByWithRelationInput | ProfessionalCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalCategories.
     */
    cursor?: ProfessionalCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalCategories.
     */
    distinct?: ProfessionalCategoryScalarFieldEnum | ProfessionalCategoryScalarFieldEnum[]
  }

  /**
   * ProfessionalCategory findFirstOrThrow
   */
  export type ProfessionalCategoryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCategory
     */
    select?: ProfessionalCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCategory
     */
    omit?: ProfessionalCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalCategory to fetch.
     */
    where?: ProfessionalCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalCategories to fetch.
     */
    orderBy?: ProfessionalCategoryOrderByWithRelationInput | ProfessionalCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for ProfessionalCategories.
     */
    cursor?: ProfessionalCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalCategories.
     */
    distinct?: ProfessionalCategoryScalarFieldEnum | ProfessionalCategoryScalarFieldEnum[]
  }

  /**
   * ProfessionalCategory findMany
   */
  export type ProfessionalCategoryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCategory
     */
    select?: ProfessionalCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCategory
     */
    omit?: ProfessionalCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCategoryInclude<ExtArgs> | null
    /**
     * Filter, which ProfessionalCategories to fetch.
     */
    where?: ProfessionalCategoryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of ProfessionalCategories to fetch.
     */
    orderBy?: ProfessionalCategoryOrderByWithRelationInput | ProfessionalCategoryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing ProfessionalCategories.
     */
    cursor?: ProfessionalCategoryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` ProfessionalCategories from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` ProfessionalCategories.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of ProfessionalCategories.
     */
    distinct?: ProfessionalCategoryScalarFieldEnum | ProfessionalCategoryScalarFieldEnum[]
  }

  /**
   * ProfessionalCategory create
   */
  export type ProfessionalCategoryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCategory
     */
    select?: ProfessionalCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCategory
     */
    omit?: ProfessionalCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCategoryInclude<ExtArgs> | null
    /**
     * The data needed to create a ProfessionalCategory.
     */
    data: XOR<ProfessionalCategoryCreateInput, ProfessionalCategoryUncheckedCreateInput>
  }

  /**
   * ProfessionalCategory createMany
   */
  export type ProfessionalCategoryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many ProfessionalCategories.
     */
    data: ProfessionalCategoryCreateManyInput | ProfessionalCategoryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * ProfessionalCategory update
   */
  export type ProfessionalCategoryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCategory
     */
    select?: ProfessionalCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCategory
     */
    omit?: ProfessionalCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCategoryInclude<ExtArgs> | null
    /**
     * The data needed to update a ProfessionalCategory.
     */
    data: XOR<ProfessionalCategoryUpdateInput, ProfessionalCategoryUncheckedUpdateInput>
    /**
     * Choose, which ProfessionalCategory to update.
     */
    where: ProfessionalCategoryWhereUniqueInput
  }

  /**
   * ProfessionalCategory updateMany
   */
  export type ProfessionalCategoryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update ProfessionalCategories.
     */
    data: XOR<ProfessionalCategoryUpdateManyMutationInput, ProfessionalCategoryUncheckedUpdateManyInput>
    /**
     * Filter which ProfessionalCategories to update
     */
    where?: ProfessionalCategoryWhereInput
    /**
     * Limit how many ProfessionalCategories to update.
     */
    limit?: number
  }

  /**
   * ProfessionalCategory upsert
   */
  export type ProfessionalCategoryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCategory
     */
    select?: ProfessionalCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCategory
     */
    omit?: ProfessionalCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCategoryInclude<ExtArgs> | null
    /**
     * The filter to search for the ProfessionalCategory to update in case it exists.
     */
    where: ProfessionalCategoryWhereUniqueInput
    /**
     * In case the ProfessionalCategory found by the `where` argument doesn't exist, create a new ProfessionalCategory with this data.
     */
    create: XOR<ProfessionalCategoryCreateInput, ProfessionalCategoryUncheckedCreateInput>
    /**
     * In case the ProfessionalCategory was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ProfessionalCategoryUpdateInput, ProfessionalCategoryUncheckedUpdateInput>
  }

  /**
   * ProfessionalCategory delete
   */
  export type ProfessionalCategoryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCategory
     */
    select?: ProfessionalCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCategory
     */
    omit?: ProfessionalCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCategoryInclude<ExtArgs> | null
    /**
     * Filter which ProfessionalCategory to delete.
     */
    where: ProfessionalCategoryWhereUniqueInput
  }

  /**
   * ProfessionalCategory deleteMany
   */
  export type ProfessionalCategoryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which ProfessionalCategories to delete
     */
    where?: ProfessionalCategoryWhereInput
    /**
     * Limit how many ProfessionalCategories to delete.
     */
    limit?: number
  }

  /**
   * ProfessionalCategory without action
   */
  export type ProfessionalCategoryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ProfessionalCategory
     */
    select?: ProfessionalCategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the ProfessionalCategory
     */
    omit?: ProfessionalCategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ProfessionalCategoryInclude<ExtArgs> | null
  }


  /**
   * Model Service
   */

  export type AggregateService = {
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  export type ServiceAvgAggregateOutputType = {
    priceValue: Decimal | null
  }

  export type ServiceSumAggregateOutputType = {
    priceValue: Decimal | null
  }

  export type ServiceMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    categoryId: string | null
    title: string | null
    priceText: string | null
    priceValue: Decimal | null
    duration: string | null
    status: $Enums.ServiceStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    categoryId: string | null
    title: string | null
    priceText: string | null
    priceValue: Decimal | null
    duration: string | null
    status: $Enums.ServiceStatus | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type ServiceCountAggregateOutputType = {
    id: number
    professionalId: number
    categoryId: number
    title: number
    priceText: number
    priceValue: number
    duration: number
    status: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type ServiceAvgAggregateInputType = {
    priceValue?: true
  }

  export type ServiceSumAggregateInputType = {
    priceValue?: true
  }

  export type ServiceMinAggregateInputType = {
    id?: true
    professionalId?: true
    categoryId?: true
    title?: true
    priceText?: true
    priceValue?: true
    duration?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceMaxAggregateInputType = {
    id?: true
    professionalId?: true
    categoryId?: true
    title?: true
    priceText?: true
    priceValue?: true
    duration?: true
    status?: true
    createdAt?: true
    updatedAt?: true
  }

  export type ServiceCountAggregateInputType = {
    id?: true
    professionalId?: true
    categoryId?: true
    title?: true
    priceText?: true
    priceValue?: true
    duration?: true
    status?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type ServiceAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Service to aggregate.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Services
    **/
    _count?: true | ServiceCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ServiceAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ServiceSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ServiceMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ServiceMaxAggregateInputType
  }

  export type GetServiceAggregateType<T extends ServiceAggregateArgs> = {
        [P in keyof T & keyof AggregateService]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateService[P]>
      : GetScalarType<T[P], AggregateService[P]>
  }




  export type ServiceGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ServiceWhereInput
    orderBy?: ServiceOrderByWithAggregationInput | ServiceOrderByWithAggregationInput[]
    by: ServiceScalarFieldEnum[] | ServiceScalarFieldEnum
    having?: ServiceScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ServiceCountAggregateInputType | true
    _avg?: ServiceAvgAggregateInputType
    _sum?: ServiceSumAggregateInputType
    _min?: ServiceMinAggregateInputType
    _max?: ServiceMaxAggregateInputType
  }

  export type ServiceGroupByOutputType = {
    id: string
    professionalId: string
    categoryId: string | null
    title: string
    priceText: string | null
    priceValue: Decimal | null
    duration: string | null
    status: $Enums.ServiceStatus
    createdAt: Date
    updatedAt: Date
    _count: ServiceCountAggregateOutputType | null
    _avg: ServiceAvgAggregateOutputType | null
    _sum: ServiceSumAggregateOutputType | null
    _min: ServiceMinAggregateOutputType | null
    _max: ServiceMaxAggregateOutputType | null
  }

  type GetServiceGroupByPayload<T extends ServiceGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ServiceGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ServiceGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ServiceGroupByOutputType[P]>
            : GetScalarType<T[P], ServiceGroupByOutputType[P]>
        }
      >
    >


  export type ServiceSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    categoryId?: boolean
    title?: boolean
    priceText?: boolean
    priceValue?: boolean
    duration?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
    orders?: boolean | Service$ordersArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["service"]>



  export type ServiceSelectScalar = {
    id?: boolean
    professionalId?: boolean
    categoryId?: boolean
    title?: boolean
    priceText?: boolean
    priceValue?: boolean
    duration?: boolean
    status?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type ServiceOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "categoryId" | "title" | "priceText" | "priceValue" | "duration" | "status" | "createdAt" | "updatedAt", ExtArgs["result"]["service"]>
  export type ServiceInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
    category?: boolean | Service$categoryArgs<ExtArgs>
    orders?: boolean | Service$ordersArgs<ExtArgs>
    _count?: boolean | ServiceCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $ServicePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Service"
    objects: {
      professional: Prisma.$ProfessionalPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs> | null
      orders: Prisma.$OrderPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      categoryId: string | null
      title: string
      priceText: string | null
      priceValue: Prisma.Decimal | null
      duration: string | null
      status: $Enums.ServiceStatus
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["service"]>
    composites: {}
  }

  type ServiceGetPayload<S extends boolean | null | undefined | ServiceDefaultArgs> = $Result.GetResult<Prisma.$ServicePayload, S>

  type ServiceCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ServiceFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ServiceCountAggregateInputType | true
    }

  export interface ServiceDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Service'], meta: { name: 'Service' } }
    /**
     * Find zero or one Service that matches the filter.
     * @param {ServiceFindUniqueArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ServiceFindUniqueArgs>(args: SelectSubset<T, ServiceFindUniqueArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Service that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ServiceFindUniqueOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ServiceFindUniqueOrThrowArgs>(args: SelectSubset<T, ServiceFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ServiceFindFirstArgs>(args?: SelectSubset<T, ServiceFindFirstArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Service that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindFirstOrThrowArgs} args - Arguments to find a Service
     * @example
     * // Get one Service
     * const service = await prisma.service.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ServiceFindFirstOrThrowArgs>(args?: SelectSubset<T, ServiceFindFirstOrThrowArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Services that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Services
     * const services = await prisma.service.findMany()
     * 
     * // Get first 10 Services
     * const services = await prisma.service.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const serviceWithIdOnly = await prisma.service.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ServiceFindManyArgs>(args?: SelectSubset<T, ServiceFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Service.
     * @param {ServiceCreateArgs} args - Arguments to create a Service.
     * @example
     * // Create one Service
     * const Service = await prisma.service.create({
     *   data: {
     *     // ... data to create a Service
     *   }
     * })
     * 
     */
    create<T extends ServiceCreateArgs>(args: SelectSubset<T, ServiceCreateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Services.
     * @param {ServiceCreateManyArgs} args - Arguments to create many Services.
     * @example
     * // Create many Services
     * const service = await prisma.service.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ServiceCreateManyArgs>(args?: SelectSubset<T, ServiceCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Service.
     * @param {ServiceDeleteArgs} args - Arguments to delete one Service.
     * @example
     * // Delete one Service
     * const Service = await prisma.service.delete({
     *   where: {
     *     // ... filter to delete one Service
     *   }
     * })
     * 
     */
    delete<T extends ServiceDeleteArgs>(args: SelectSubset<T, ServiceDeleteArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Service.
     * @param {ServiceUpdateArgs} args - Arguments to update one Service.
     * @example
     * // Update one Service
     * const service = await prisma.service.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ServiceUpdateArgs>(args: SelectSubset<T, ServiceUpdateArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Services.
     * @param {ServiceDeleteManyArgs} args - Arguments to filter Services to delete.
     * @example
     * // Delete a few Services
     * const { count } = await prisma.service.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ServiceDeleteManyArgs>(args?: SelectSubset<T, ServiceDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Services
     * const service = await prisma.service.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ServiceUpdateManyArgs>(args: SelectSubset<T, ServiceUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Service.
     * @param {ServiceUpsertArgs} args - Arguments to update or create a Service.
     * @example
     * // Update or create a Service
     * const service = await prisma.service.upsert({
     *   create: {
     *     // ... data to create a Service
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Service we want to update
     *   }
     * })
     */
    upsert<T extends ServiceUpsertArgs>(args: SelectSubset<T, ServiceUpsertArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Services.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceCountArgs} args - Arguments to filter Services to count.
     * @example
     * // Count the number of Services
     * const count = await prisma.service.count({
     *   where: {
     *     // ... the filter for the Services we want to count
     *   }
     * })
    **/
    count<T extends ServiceCountArgs>(
      args?: Subset<T, ServiceCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ServiceCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ServiceAggregateArgs>(args: Subset<T, ServiceAggregateArgs>): Prisma.PrismaPromise<GetServiceAggregateType<T>>

    /**
     * Group by Service.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ServiceGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ServiceGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ServiceGroupByArgs['orderBy'] }
        : { orderBy?: ServiceGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ServiceGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetServiceGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Service model
   */
  readonly fields: ServiceFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Service.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ServiceClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends Service$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Service$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    orders<T extends Service$ordersArgs<ExtArgs> = {}>(args?: Subset<T, Service$ordersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Service model
   */
  interface ServiceFieldRefs {
    readonly id: FieldRef<"Service", 'String'>
    readonly professionalId: FieldRef<"Service", 'String'>
    readonly categoryId: FieldRef<"Service", 'String'>
    readonly title: FieldRef<"Service", 'String'>
    readonly priceText: FieldRef<"Service", 'String'>
    readonly priceValue: FieldRef<"Service", 'Decimal'>
    readonly duration: FieldRef<"Service", 'String'>
    readonly status: FieldRef<"Service", 'ServiceStatus'>
    readonly createdAt: FieldRef<"Service", 'DateTime'>
    readonly updatedAt: FieldRef<"Service", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Service findUnique
   */
  export type ServiceFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findUniqueOrThrow
   */
  export type ServiceFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service findFirst
   */
  export type ServiceFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findFirstOrThrow
   */
  export type ServiceFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Service to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service findMany
   */
  export type ServiceFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter, which Services to fetch.
     */
    where?: ServiceWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Services to fetch.
     */
    orderBy?: ServiceOrderByWithRelationInput | ServiceOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Services.
     */
    cursor?: ServiceWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Services from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Services.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Services.
     */
    distinct?: ServiceScalarFieldEnum | ServiceScalarFieldEnum[]
  }

  /**
   * Service create
   */
  export type ServiceCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to create a Service.
     */
    data: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
  }

  /**
   * Service createMany
   */
  export type ServiceCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Services.
     */
    data: ServiceCreateManyInput | ServiceCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Service update
   */
  export type ServiceUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The data needed to update a Service.
     */
    data: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
    /**
     * Choose, which Service to update.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service updateMany
   */
  export type ServiceUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Services.
     */
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyInput>
    /**
     * Filter which Services to update
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to update.
     */
    limit?: number
  }

  /**
   * Service upsert
   */
  export type ServiceUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * The filter to search for the Service to update in case it exists.
     */
    where: ServiceWhereUniqueInput
    /**
     * In case the Service found by the `where` argument doesn't exist, create a new Service with this data.
     */
    create: XOR<ServiceCreateInput, ServiceUncheckedCreateInput>
    /**
     * In case the Service was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ServiceUpdateInput, ServiceUncheckedUpdateInput>
  }

  /**
   * Service delete
   */
  export type ServiceDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    /**
     * Filter which Service to delete.
     */
    where: ServiceWhereUniqueInput
  }

  /**
   * Service deleteMany
   */
  export type ServiceDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Services to delete
     */
    where?: ServiceWhereInput
    /**
     * Limit how many Services to delete.
     */
    limit?: number
  }

  /**
   * Service.category
   */
  export type Service$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Service.orders
   */
  export type Service$ordersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    cursor?: OrderWhereUniqueInput
    take?: number
    skip?: number
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Service without action
   */
  export type ServiceDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
  }


  /**
   * Model Order
   */

  export type AggregateOrder = {
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  export type OrderAvgAggregateOutputType = {
    agreedPrice: Decimal | null
  }

  export type OrderSumAggregateOutputType = {
    agreedPrice: Decimal | null
  }

  export type OrderMinAggregateOutputType = {
    id: string | null
    clientId: string | null
    professionalId: string | null
    serviceId: string | null
    categoryId: string | null
    status: $Enums.OrderStatus | null
    serviceType: string | null
    description: string | null
    locationCep: string | null
    address: string | null
    urgency: string | null
    agreedPrice: Decimal | null
    scheduledAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderMaxAggregateOutputType = {
    id: string | null
    clientId: string | null
    professionalId: string | null
    serviceId: string | null
    categoryId: string | null
    status: $Enums.OrderStatus | null
    serviceType: string | null
    description: string | null
    locationCep: string | null
    address: string | null
    urgency: string | null
    agreedPrice: Decimal | null
    scheduledAt: Date | null
    notes: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type OrderCountAggregateOutputType = {
    id: number
    clientId: number
    professionalId: number
    serviceId: number
    categoryId: number
    status: number
    serviceType: number
    description: number
    locationCep: number
    address: number
    urgency: number
    attachments: number
    agreedPrice: number
    scheduledAt: number
    notes: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type OrderAvgAggregateInputType = {
    agreedPrice?: true
  }

  export type OrderSumAggregateInputType = {
    agreedPrice?: true
  }

  export type OrderMinAggregateInputType = {
    id?: true
    clientId?: true
    professionalId?: true
    serviceId?: true
    categoryId?: true
    status?: true
    serviceType?: true
    description?: true
    locationCep?: true
    address?: true
    urgency?: true
    agreedPrice?: true
    scheduledAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderMaxAggregateInputType = {
    id?: true
    clientId?: true
    professionalId?: true
    serviceId?: true
    categoryId?: true
    status?: true
    serviceType?: true
    description?: true
    locationCep?: true
    address?: true
    urgency?: true
    agreedPrice?: true
    scheduledAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
  }

  export type OrderCountAggregateInputType = {
    id?: true
    clientId?: true
    professionalId?: true
    serviceId?: true
    categoryId?: true
    status?: true
    serviceType?: true
    description?: true
    locationCep?: true
    address?: true
    urgency?: true
    attachments?: true
    agreedPrice?: true
    scheduledAt?: true
    notes?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type OrderAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Order to aggregate.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Orders
    **/
    _count?: true | OrderCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: OrderAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: OrderSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: OrderMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: OrderMaxAggregateInputType
  }

  export type GetOrderAggregateType<T extends OrderAggregateArgs> = {
        [P in keyof T & keyof AggregateOrder]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateOrder[P]>
      : GetScalarType<T[P], AggregateOrder[P]>
  }




  export type OrderGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: OrderWhereInput
    orderBy?: OrderOrderByWithAggregationInput | OrderOrderByWithAggregationInput[]
    by: OrderScalarFieldEnum[] | OrderScalarFieldEnum
    having?: OrderScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: OrderCountAggregateInputType | true
    _avg?: OrderAvgAggregateInputType
    _sum?: OrderSumAggregateInputType
    _min?: OrderMinAggregateInputType
    _max?: OrderMaxAggregateInputType
  }

  export type OrderGroupByOutputType = {
    id: string
    clientId: string
    professionalId: string
    serviceId: string | null
    categoryId: string | null
    status: $Enums.OrderStatus
    serviceType: string | null
    description: string | null
    locationCep: string | null
    address: string | null
    urgency: string | null
    attachments: JsonValue | null
    agreedPrice: Decimal | null
    scheduledAt: Date | null
    notes: string | null
    createdAt: Date
    updatedAt: Date
    _count: OrderCountAggregateOutputType | null
    _avg: OrderAvgAggregateOutputType | null
    _sum: OrderSumAggregateOutputType | null
    _min: OrderMinAggregateOutputType | null
    _max: OrderMaxAggregateOutputType | null
  }

  type GetOrderGroupByPayload<T extends OrderGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<OrderGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof OrderGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], OrderGroupByOutputType[P]>
            : GetScalarType<T[P], OrderGroupByOutputType[P]>
        }
      >
    >


  export type OrderSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    clientId?: boolean
    professionalId?: boolean
    serviceId?: boolean
    categoryId?: boolean
    status?: boolean
    serviceType?: boolean
    description?: boolean
    locationCep?: boolean
    address?: boolean
    urgency?: boolean
    attachments?: boolean
    agreedPrice?: boolean
    scheduledAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    client?: boolean | ClientDefaultArgs<ExtArgs>
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
    service?: boolean | Order$serviceArgs<ExtArgs>
    category?: boolean | Order$categoryArgs<ExtArgs>
    appointments?: boolean | Order$appointmentsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["order"]>



  export type OrderSelectScalar = {
    id?: boolean
    clientId?: boolean
    professionalId?: boolean
    serviceId?: boolean
    categoryId?: boolean
    status?: boolean
    serviceType?: boolean
    description?: boolean
    locationCep?: boolean
    address?: boolean
    urgency?: boolean
    attachments?: boolean
    agreedPrice?: boolean
    scheduledAt?: boolean
    notes?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type OrderOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "clientId" | "professionalId" | "serviceId" | "categoryId" | "status" | "serviceType" | "description" | "locationCep" | "address" | "urgency" | "attachments" | "agreedPrice" | "scheduledAt" | "notes" | "createdAt" | "updatedAt", ExtArgs["result"]["order"]>
  export type OrderInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    client?: boolean | ClientDefaultArgs<ExtArgs>
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
    service?: boolean | Order$serviceArgs<ExtArgs>
    category?: boolean | Order$categoryArgs<ExtArgs>
    appointments?: boolean | Order$appointmentsArgs<ExtArgs>
    _count?: boolean | OrderCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $OrderPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Order"
    objects: {
      client: Prisma.$ClientPayload<ExtArgs>
      professional: Prisma.$ProfessionalPayload<ExtArgs>
      service: Prisma.$ServicePayload<ExtArgs> | null
      category: Prisma.$CategoryPayload<ExtArgs> | null
      appointments: Prisma.$AppointmentPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      clientId: string
      professionalId: string
      serviceId: string | null
      categoryId: string | null
      status: $Enums.OrderStatus
      serviceType: string | null
      description: string | null
      locationCep: string | null
      address: string | null
      urgency: string | null
      attachments: Prisma.JsonValue | null
      agreedPrice: Prisma.Decimal | null
      scheduledAt: Date | null
      notes: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["order"]>
    composites: {}
  }

  type OrderGetPayload<S extends boolean | null | undefined | OrderDefaultArgs> = $Result.GetResult<Prisma.$OrderPayload, S>

  type OrderCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<OrderFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: OrderCountAggregateInputType | true
    }

  export interface OrderDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Order'], meta: { name: 'Order' } }
    /**
     * Find zero or one Order that matches the filter.
     * @param {OrderFindUniqueArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends OrderFindUniqueArgs>(args: SelectSubset<T, OrderFindUniqueArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Order that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {OrderFindUniqueOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends OrderFindUniqueOrThrowArgs>(args: SelectSubset<T, OrderFindUniqueOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends OrderFindFirstArgs>(args?: SelectSubset<T, OrderFindFirstArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Order that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindFirstOrThrowArgs} args - Arguments to find a Order
     * @example
     * // Get one Order
     * const order = await prisma.order.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends OrderFindFirstOrThrowArgs>(args?: SelectSubset<T, OrderFindFirstOrThrowArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Orders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Orders
     * const orders = await prisma.order.findMany()
     * 
     * // Get first 10 Orders
     * const orders = await prisma.order.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const orderWithIdOnly = await prisma.order.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends OrderFindManyArgs>(args?: SelectSubset<T, OrderFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Order.
     * @param {OrderCreateArgs} args - Arguments to create a Order.
     * @example
     * // Create one Order
     * const Order = await prisma.order.create({
     *   data: {
     *     // ... data to create a Order
     *   }
     * })
     * 
     */
    create<T extends OrderCreateArgs>(args: SelectSubset<T, OrderCreateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Orders.
     * @param {OrderCreateManyArgs} args - Arguments to create many Orders.
     * @example
     * // Create many Orders
     * const order = await prisma.order.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends OrderCreateManyArgs>(args?: SelectSubset<T, OrderCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Order.
     * @param {OrderDeleteArgs} args - Arguments to delete one Order.
     * @example
     * // Delete one Order
     * const Order = await prisma.order.delete({
     *   where: {
     *     // ... filter to delete one Order
     *   }
     * })
     * 
     */
    delete<T extends OrderDeleteArgs>(args: SelectSubset<T, OrderDeleteArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Order.
     * @param {OrderUpdateArgs} args - Arguments to update one Order.
     * @example
     * // Update one Order
     * const order = await prisma.order.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends OrderUpdateArgs>(args: SelectSubset<T, OrderUpdateArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Orders.
     * @param {OrderDeleteManyArgs} args - Arguments to filter Orders to delete.
     * @example
     * // Delete a few Orders
     * const { count } = await prisma.order.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends OrderDeleteManyArgs>(args?: SelectSubset<T, OrderDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Orders
     * const order = await prisma.order.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends OrderUpdateManyArgs>(args: SelectSubset<T, OrderUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Order.
     * @param {OrderUpsertArgs} args - Arguments to update or create a Order.
     * @example
     * // Update or create a Order
     * const order = await prisma.order.upsert({
     *   create: {
     *     // ... data to create a Order
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Order we want to update
     *   }
     * })
     */
    upsert<T extends OrderUpsertArgs>(args: SelectSubset<T, OrderUpsertArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Orders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderCountArgs} args - Arguments to filter Orders to count.
     * @example
     * // Count the number of Orders
     * const count = await prisma.order.count({
     *   where: {
     *     // ... the filter for the Orders we want to count
     *   }
     * })
    **/
    count<T extends OrderCountArgs>(
      args?: Subset<T, OrderCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], OrderCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends OrderAggregateArgs>(args: Subset<T, OrderAggregateArgs>): Prisma.PrismaPromise<GetOrderAggregateType<T>>

    /**
     * Group by Order.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {OrderGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends OrderGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: OrderGroupByArgs['orderBy'] }
        : { orderBy?: OrderGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, OrderGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetOrderGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Order model
   */
  readonly fields: OrderFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Order.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__OrderClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    client<T extends ClientDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ClientDefaultArgs<ExtArgs>>): Prisma__ClientClient<$Result.GetResult<Prisma.$ClientPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    service<T extends Order$serviceArgs<ExtArgs> = {}>(args?: Subset<T, Order$serviceArgs<ExtArgs>>): Prisma__ServiceClient<$Result.GetResult<Prisma.$ServicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    category<T extends Order$categoryArgs<ExtArgs> = {}>(args?: Subset<T, Order$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    appointments<T extends Order$appointmentsArgs<ExtArgs> = {}>(args?: Subset<T, Order$appointmentsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Order model
   */
  interface OrderFieldRefs {
    readonly id: FieldRef<"Order", 'String'>
    readonly clientId: FieldRef<"Order", 'String'>
    readonly professionalId: FieldRef<"Order", 'String'>
    readonly serviceId: FieldRef<"Order", 'String'>
    readonly categoryId: FieldRef<"Order", 'String'>
    readonly status: FieldRef<"Order", 'OrderStatus'>
    readonly serviceType: FieldRef<"Order", 'String'>
    readonly description: FieldRef<"Order", 'String'>
    readonly locationCep: FieldRef<"Order", 'String'>
    readonly address: FieldRef<"Order", 'String'>
    readonly urgency: FieldRef<"Order", 'String'>
    readonly attachments: FieldRef<"Order", 'Json'>
    readonly agreedPrice: FieldRef<"Order", 'Decimal'>
    readonly scheduledAt: FieldRef<"Order", 'DateTime'>
    readonly notes: FieldRef<"Order", 'String'>
    readonly createdAt: FieldRef<"Order", 'DateTime'>
    readonly updatedAt: FieldRef<"Order", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Order findUnique
   */
  export type OrderFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findUniqueOrThrow
   */
  export type OrderFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order findFirst
   */
  export type OrderFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findFirstOrThrow
   */
  export type OrderFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Order to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order findMany
   */
  export type OrderFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter, which Orders to fetch.
     */
    where?: OrderWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Orders to fetch.
     */
    orderBy?: OrderOrderByWithRelationInput | OrderOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Orders.
     */
    cursor?: OrderWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Orders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Orders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Orders.
     */
    distinct?: OrderScalarFieldEnum | OrderScalarFieldEnum[]
  }

  /**
   * Order create
   */
  export type OrderCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to create a Order.
     */
    data: XOR<OrderCreateInput, OrderUncheckedCreateInput>
  }

  /**
   * Order createMany
   */
  export type OrderCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Orders.
     */
    data: OrderCreateManyInput | OrderCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Order update
   */
  export type OrderUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The data needed to update a Order.
     */
    data: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
    /**
     * Choose, which Order to update.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order updateMany
   */
  export type OrderUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Orders.
     */
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyInput>
    /**
     * Filter which Orders to update
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to update.
     */
    limit?: number
  }

  /**
   * Order upsert
   */
  export type OrderUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * The filter to search for the Order to update in case it exists.
     */
    where: OrderWhereUniqueInput
    /**
     * In case the Order found by the `where` argument doesn't exist, create a new Order with this data.
     */
    create: XOR<OrderCreateInput, OrderUncheckedCreateInput>
    /**
     * In case the Order was found with the provided `where` argument, update it with this data.
     */
    update: XOR<OrderUpdateInput, OrderUncheckedUpdateInput>
  }

  /**
   * Order delete
   */
  export type OrderDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    /**
     * Filter which Order to delete.
     */
    where: OrderWhereUniqueInput
  }

  /**
   * Order deleteMany
   */
  export type OrderDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Orders to delete
     */
    where?: OrderWhereInput
    /**
     * Limit how many Orders to delete.
     */
    limit?: number
  }

  /**
   * Order.service
   */
  export type Order$serviceArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Service
     */
    select?: ServiceSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Service
     */
    omit?: ServiceOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ServiceInclude<ExtArgs> | null
    where?: ServiceWhereInput
  }

  /**
   * Order.category
   */
  export type Order$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * Order.appointments
   */
  export type Order$appointmentsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    cursor?: AppointmentWhereUniqueInput
    take?: number
    skip?: number
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Order without action
   */
  export type OrderDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
  }


  /**
   * Model PortfolioItem
   */

  export type AggregatePortfolioItem = {
    _count: PortfolioItemCountAggregateOutputType | null
    _avg: PortfolioItemAvgAggregateOutputType | null
    _sum: PortfolioItemSumAggregateOutputType | null
    _min: PortfolioItemMinAggregateOutputType | null
    _max: PortfolioItemMaxAggregateOutputType | null
  }

  export type PortfolioItemAvgAggregateOutputType = {
    year: number | null
  }

  export type PortfolioItemSumAggregateOutputType = {
    year: number | null
  }

  export type PortfolioItemMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    categoryId: string | null
    title: string | null
    imageUrl: string | null
    year: number | null
    createdAt: Date | null
  }

  export type PortfolioItemMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    categoryId: string | null
    title: string | null
    imageUrl: string | null
    year: number | null
    createdAt: Date | null
  }

  export type PortfolioItemCountAggregateOutputType = {
    id: number
    professionalId: number
    categoryId: number
    title: number
    imageUrl: number
    year: number
    createdAt: number
    _all: number
  }


  export type PortfolioItemAvgAggregateInputType = {
    year?: true
  }

  export type PortfolioItemSumAggregateInputType = {
    year?: true
  }

  export type PortfolioItemMinAggregateInputType = {
    id?: true
    professionalId?: true
    categoryId?: true
    title?: true
    imageUrl?: true
    year?: true
    createdAt?: true
  }

  export type PortfolioItemMaxAggregateInputType = {
    id?: true
    professionalId?: true
    categoryId?: true
    title?: true
    imageUrl?: true
    year?: true
    createdAt?: true
  }

  export type PortfolioItemCountAggregateInputType = {
    id?: true
    professionalId?: true
    categoryId?: true
    title?: true
    imageUrl?: true
    year?: true
    createdAt?: true
    _all?: true
  }

  export type PortfolioItemAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortfolioItem to aggregate.
     */
    where?: PortfolioItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioItems to fetch.
     */
    orderBy?: PortfolioItemOrderByWithRelationInput | PortfolioItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: PortfolioItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned PortfolioItems
    **/
    _count?: true | PortfolioItemCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: PortfolioItemAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: PortfolioItemSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: PortfolioItemMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: PortfolioItemMaxAggregateInputType
  }

  export type GetPortfolioItemAggregateType<T extends PortfolioItemAggregateArgs> = {
        [P in keyof T & keyof AggregatePortfolioItem]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePortfolioItem[P]>
      : GetScalarType<T[P], AggregatePortfolioItem[P]>
  }




  export type PortfolioItemGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: PortfolioItemWhereInput
    orderBy?: PortfolioItemOrderByWithAggregationInput | PortfolioItemOrderByWithAggregationInput[]
    by: PortfolioItemScalarFieldEnum[] | PortfolioItemScalarFieldEnum
    having?: PortfolioItemScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: PortfolioItemCountAggregateInputType | true
    _avg?: PortfolioItemAvgAggregateInputType
    _sum?: PortfolioItemSumAggregateInputType
    _min?: PortfolioItemMinAggregateInputType
    _max?: PortfolioItemMaxAggregateInputType
  }

  export type PortfolioItemGroupByOutputType = {
    id: string
    professionalId: string
    categoryId: string | null
    title: string
    imageUrl: string | null
    year: number | null
    createdAt: Date
    _count: PortfolioItemCountAggregateOutputType | null
    _avg: PortfolioItemAvgAggregateOutputType | null
    _sum: PortfolioItemSumAggregateOutputType | null
    _min: PortfolioItemMinAggregateOutputType | null
    _max: PortfolioItemMaxAggregateOutputType | null
  }

  type GetPortfolioItemGroupByPayload<T extends PortfolioItemGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<PortfolioItemGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof PortfolioItemGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], PortfolioItemGroupByOutputType[P]>
            : GetScalarType<T[P], PortfolioItemGroupByOutputType[P]>
        }
      >
    >


  export type PortfolioItemSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    categoryId?: boolean
    title?: boolean
    imageUrl?: boolean
    year?: boolean
    createdAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
    category?: boolean | PortfolioItem$categoryArgs<ExtArgs>
  }, ExtArgs["result"]["portfolioItem"]>



  export type PortfolioItemSelectScalar = {
    id?: boolean
    professionalId?: boolean
    categoryId?: boolean
    title?: boolean
    imageUrl?: boolean
    year?: boolean
    createdAt?: boolean
  }

  export type PortfolioItemOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "categoryId" | "title" | "imageUrl" | "year" | "createdAt", ExtArgs["result"]["portfolioItem"]>
  export type PortfolioItemInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
    category?: boolean | PortfolioItem$categoryArgs<ExtArgs>
  }

  export type $PortfolioItemPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "PortfolioItem"
    objects: {
      professional: Prisma.$ProfessionalPayload<ExtArgs>
      category: Prisma.$CategoryPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      categoryId: string | null
      title: string
      imageUrl: string | null
      year: number | null
      createdAt: Date
    }, ExtArgs["result"]["portfolioItem"]>
    composites: {}
  }

  type PortfolioItemGetPayload<S extends boolean | null | undefined | PortfolioItemDefaultArgs> = $Result.GetResult<Prisma.$PortfolioItemPayload, S>

  type PortfolioItemCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<PortfolioItemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: PortfolioItemCountAggregateInputType | true
    }

  export interface PortfolioItemDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['PortfolioItem'], meta: { name: 'PortfolioItem' } }
    /**
     * Find zero or one PortfolioItem that matches the filter.
     * @param {PortfolioItemFindUniqueArgs} args - Arguments to find a PortfolioItem
     * @example
     * // Get one PortfolioItem
     * const portfolioItem = await prisma.portfolioItem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends PortfolioItemFindUniqueArgs>(args: SelectSubset<T, PortfolioItemFindUniqueArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one PortfolioItem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {PortfolioItemFindUniqueOrThrowArgs} args - Arguments to find a PortfolioItem
     * @example
     * // Get one PortfolioItem
     * const portfolioItem = await prisma.portfolioItem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends PortfolioItemFindUniqueOrThrowArgs>(args: SelectSubset<T, PortfolioItemFindUniqueOrThrowArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortfolioItem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemFindFirstArgs} args - Arguments to find a PortfolioItem
     * @example
     * // Get one PortfolioItem
     * const portfolioItem = await prisma.portfolioItem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends PortfolioItemFindFirstArgs>(args?: SelectSubset<T, PortfolioItemFindFirstArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first PortfolioItem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemFindFirstOrThrowArgs} args - Arguments to find a PortfolioItem
     * @example
     * // Get one PortfolioItem
     * const portfolioItem = await prisma.portfolioItem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends PortfolioItemFindFirstOrThrowArgs>(args?: SelectSubset<T, PortfolioItemFindFirstOrThrowArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more PortfolioItems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all PortfolioItems
     * const portfolioItems = await prisma.portfolioItem.findMany()
     * 
     * // Get first 10 PortfolioItems
     * const portfolioItems = await prisma.portfolioItem.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const portfolioItemWithIdOnly = await prisma.portfolioItem.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends PortfolioItemFindManyArgs>(args?: SelectSubset<T, PortfolioItemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a PortfolioItem.
     * @param {PortfolioItemCreateArgs} args - Arguments to create a PortfolioItem.
     * @example
     * // Create one PortfolioItem
     * const PortfolioItem = await prisma.portfolioItem.create({
     *   data: {
     *     // ... data to create a PortfolioItem
     *   }
     * })
     * 
     */
    create<T extends PortfolioItemCreateArgs>(args: SelectSubset<T, PortfolioItemCreateArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many PortfolioItems.
     * @param {PortfolioItemCreateManyArgs} args - Arguments to create many PortfolioItems.
     * @example
     * // Create many PortfolioItems
     * const portfolioItem = await prisma.portfolioItem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends PortfolioItemCreateManyArgs>(args?: SelectSubset<T, PortfolioItemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a PortfolioItem.
     * @param {PortfolioItemDeleteArgs} args - Arguments to delete one PortfolioItem.
     * @example
     * // Delete one PortfolioItem
     * const PortfolioItem = await prisma.portfolioItem.delete({
     *   where: {
     *     // ... filter to delete one PortfolioItem
     *   }
     * })
     * 
     */
    delete<T extends PortfolioItemDeleteArgs>(args: SelectSubset<T, PortfolioItemDeleteArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one PortfolioItem.
     * @param {PortfolioItemUpdateArgs} args - Arguments to update one PortfolioItem.
     * @example
     * // Update one PortfolioItem
     * const portfolioItem = await prisma.portfolioItem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends PortfolioItemUpdateArgs>(args: SelectSubset<T, PortfolioItemUpdateArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more PortfolioItems.
     * @param {PortfolioItemDeleteManyArgs} args - Arguments to filter PortfolioItems to delete.
     * @example
     * // Delete a few PortfolioItems
     * const { count } = await prisma.portfolioItem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends PortfolioItemDeleteManyArgs>(args?: SelectSubset<T, PortfolioItemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more PortfolioItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many PortfolioItems
     * const portfolioItem = await prisma.portfolioItem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends PortfolioItemUpdateManyArgs>(args: SelectSubset<T, PortfolioItemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one PortfolioItem.
     * @param {PortfolioItemUpsertArgs} args - Arguments to update or create a PortfolioItem.
     * @example
     * // Update or create a PortfolioItem
     * const portfolioItem = await prisma.portfolioItem.upsert({
     *   create: {
     *     // ... data to create a PortfolioItem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the PortfolioItem we want to update
     *   }
     * })
     */
    upsert<T extends PortfolioItemUpsertArgs>(args: SelectSubset<T, PortfolioItemUpsertArgs<ExtArgs>>): Prisma__PortfolioItemClient<$Result.GetResult<Prisma.$PortfolioItemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of PortfolioItems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemCountArgs} args - Arguments to filter PortfolioItems to count.
     * @example
     * // Count the number of PortfolioItems
     * const count = await prisma.portfolioItem.count({
     *   where: {
     *     // ... the filter for the PortfolioItems we want to count
     *   }
     * })
    **/
    count<T extends PortfolioItemCountArgs>(
      args?: Subset<T, PortfolioItemCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], PortfolioItemCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a PortfolioItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends PortfolioItemAggregateArgs>(args: Subset<T, PortfolioItemAggregateArgs>): Prisma.PrismaPromise<GetPortfolioItemAggregateType<T>>

    /**
     * Group by PortfolioItem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {PortfolioItemGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends PortfolioItemGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: PortfolioItemGroupByArgs['orderBy'] }
        : { orderBy?: PortfolioItemGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, PortfolioItemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPortfolioItemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the PortfolioItem model
   */
  readonly fields: PortfolioItemFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for PortfolioItem.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__PortfolioItemClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    category<T extends PortfolioItem$categoryArgs<ExtArgs> = {}>(args?: Subset<T, PortfolioItem$categoryArgs<ExtArgs>>): Prisma__CategoryClient<$Result.GetResult<Prisma.$CategoryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the PortfolioItem model
   */
  interface PortfolioItemFieldRefs {
    readonly id: FieldRef<"PortfolioItem", 'String'>
    readonly professionalId: FieldRef<"PortfolioItem", 'String'>
    readonly categoryId: FieldRef<"PortfolioItem", 'String'>
    readonly title: FieldRef<"PortfolioItem", 'String'>
    readonly imageUrl: FieldRef<"PortfolioItem", 'String'>
    readonly year: FieldRef<"PortfolioItem", 'Int'>
    readonly createdAt: FieldRef<"PortfolioItem", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * PortfolioItem findUnique
   */
  export type PortfolioItemFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioItem to fetch.
     */
    where: PortfolioItemWhereUniqueInput
  }

  /**
   * PortfolioItem findUniqueOrThrow
   */
  export type PortfolioItemFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioItem to fetch.
     */
    where: PortfolioItemWhereUniqueInput
  }

  /**
   * PortfolioItem findFirst
   */
  export type PortfolioItemFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioItem to fetch.
     */
    where?: PortfolioItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioItems to fetch.
     */
    orderBy?: PortfolioItemOrderByWithRelationInput | PortfolioItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortfolioItems.
     */
    cursor?: PortfolioItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortfolioItems.
     */
    distinct?: PortfolioItemScalarFieldEnum | PortfolioItemScalarFieldEnum[]
  }

  /**
   * PortfolioItem findFirstOrThrow
   */
  export type PortfolioItemFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioItem to fetch.
     */
    where?: PortfolioItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioItems to fetch.
     */
    orderBy?: PortfolioItemOrderByWithRelationInput | PortfolioItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for PortfolioItems.
     */
    cursor?: PortfolioItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortfolioItems.
     */
    distinct?: PortfolioItemScalarFieldEnum | PortfolioItemScalarFieldEnum[]
  }

  /**
   * PortfolioItem findMany
   */
  export type PortfolioItemFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * Filter, which PortfolioItems to fetch.
     */
    where?: PortfolioItemWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of PortfolioItems to fetch.
     */
    orderBy?: PortfolioItemOrderByWithRelationInput | PortfolioItemOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing PortfolioItems.
     */
    cursor?: PortfolioItemWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` PortfolioItems from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` PortfolioItems.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of PortfolioItems.
     */
    distinct?: PortfolioItemScalarFieldEnum | PortfolioItemScalarFieldEnum[]
  }

  /**
   * PortfolioItem create
   */
  export type PortfolioItemCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * The data needed to create a PortfolioItem.
     */
    data: XOR<PortfolioItemCreateInput, PortfolioItemUncheckedCreateInput>
  }

  /**
   * PortfolioItem createMany
   */
  export type PortfolioItemCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many PortfolioItems.
     */
    data: PortfolioItemCreateManyInput | PortfolioItemCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * PortfolioItem update
   */
  export type PortfolioItemUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * The data needed to update a PortfolioItem.
     */
    data: XOR<PortfolioItemUpdateInput, PortfolioItemUncheckedUpdateInput>
    /**
     * Choose, which PortfolioItem to update.
     */
    where: PortfolioItemWhereUniqueInput
  }

  /**
   * PortfolioItem updateMany
   */
  export type PortfolioItemUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update PortfolioItems.
     */
    data: XOR<PortfolioItemUpdateManyMutationInput, PortfolioItemUncheckedUpdateManyInput>
    /**
     * Filter which PortfolioItems to update
     */
    where?: PortfolioItemWhereInput
    /**
     * Limit how many PortfolioItems to update.
     */
    limit?: number
  }

  /**
   * PortfolioItem upsert
   */
  export type PortfolioItemUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * The filter to search for the PortfolioItem to update in case it exists.
     */
    where: PortfolioItemWhereUniqueInput
    /**
     * In case the PortfolioItem found by the `where` argument doesn't exist, create a new PortfolioItem with this data.
     */
    create: XOR<PortfolioItemCreateInput, PortfolioItemUncheckedCreateInput>
    /**
     * In case the PortfolioItem was found with the provided `where` argument, update it with this data.
     */
    update: XOR<PortfolioItemUpdateInput, PortfolioItemUncheckedUpdateInput>
  }

  /**
   * PortfolioItem delete
   */
  export type PortfolioItemDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
    /**
     * Filter which PortfolioItem to delete.
     */
    where: PortfolioItemWhereUniqueInput
  }

  /**
   * PortfolioItem deleteMany
   */
  export type PortfolioItemDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which PortfolioItems to delete
     */
    where?: PortfolioItemWhereInput
    /**
     * Limit how many PortfolioItems to delete.
     */
    limit?: number
  }

  /**
   * PortfolioItem.category
   */
  export type PortfolioItem$categoryArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Category
     */
    select?: CategorySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Category
     */
    omit?: CategoryOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CategoryInclude<ExtArgs> | null
    where?: CategoryWhereInput
  }

  /**
   * PortfolioItem without action
   */
  export type PortfolioItemDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the PortfolioItem
     */
    select?: PortfolioItemSelect<ExtArgs> | null
    /**
     * Omit specific fields from the PortfolioItem
     */
    omit?: PortfolioItemOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: PortfolioItemInclude<ExtArgs> | null
  }


  /**
   * Model Testimonial
   */

  export type AggregateTestimonial = {
    _count: TestimonialCountAggregateOutputType | null
    _avg: TestimonialAvgAggregateOutputType | null
    _sum: TestimonialSumAggregateOutputType | null
    _min: TestimonialMinAggregateOutputType | null
    _max: TestimonialMaxAggregateOutputType | null
  }

  export type TestimonialAvgAggregateOutputType = {
    rating: number | null
  }

  export type TestimonialSumAggregateOutputType = {
    rating: number | null
  }

  export type TestimonialMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    authorId: string | null
    authorName: string | null
    authorRole: string | null
    content: string | null
    rating: number | null
    createdAt: Date | null
  }

  export type TestimonialMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    authorId: string | null
    authorName: string | null
    authorRole: string | null
    content: string | null
    rating: number | null
    createdAt: Date | null
  }

  export type TestimonialCountAggregateOutputType = {
    id: number
    professionalId: number
    authorId: number
    authorName: number
    authorRole: number
    content: number
    rating: number
    createdAt: number
    _all: number
  }


  export type TestimonialAvgAggregateInputType = {
    rating?: true
  }

  export type TestimonialSumAggregateInputType = {
    rating?: true
  }

  export type TestimonialMinAggregateInputType = {
    id?: true
    professionalId?: true
    authorId?: true
    authorName?: true
    authorRole?: true
    content?: true
    rating?: true
    createdAt?: true
  }

  export type TestimonialMaxAggregateInputType = {
    id?: true
    professionalId?: true
    authorId?: true
    authorName?: true
    authorRole?: true
    content?: true
    rating?: true
    createdAt?: true
  }

  export type TestimonialCountAggregateInputType = {
    id?: true
    professionalId?: true
    authorId?: true
    authorName?: true
    authorRole?: true
    content?: true
    rating?: true
    createdAt?: true
    _all?: true
  }

  export type TestimonialAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Testimonial to aggregate.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Testimonials
    **/
    _count?: true | TestimonialCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: TestimonialAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: TestimonialSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TestimonialMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TestimonialMaxAggregateInputType
  }

  export type GetTestimonialAggregateType<T extends TestimonialAggregateArgs> = {
        [P in keyof T & keyof AggregateTestimonial]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTestimonial[P]>
      : GetScalarType<T[P], AggregateTestimonial[P]>
  }




  export type TestimonialGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: TestimonialWhereInput
    orderBy?: TestimonialOrderByWithAggregationInput | TestimonialOrderByWithAggregationInput[]
    by: TestimonialScalarFieldEnum[] | TestimonialScalarFieldEnum
    having?: TestimonialScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TestimonialCountAggregateInputType | true
    _avg?: TestimonialAvgAggregateInputType
    _sum?: TestimonialSumAggregateInputType
    _min?: TestimonialMinAggregateInputType
    _max?: TestimonialMaxAggregateInputType
  }

  export type TestimonialGroupByOutputType = {
    id: string
    professionalId: string
    authorId: string | null
    authorName: string | null
    authorRole: string | null
    content: string
    rating: number
    createdAt: Date
    _count: TestimonialCountAggregateOutputType | null
    _avg: TestimonialAvgAggregateOutputType | null
    _sum: TestimonialSumAggregateOutputType | null
    _min: TestimonialMinAggregateOutputType | null
    _max: TestimonialMaxAggregateOutputType | null
  }

  type GetTestimonialGroupByPayload<T extends TestimonialGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TestimonialGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TestimonialGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TestimonialGroupByOutputType[P]>
            : GetScalarType<T[P], TestimonialGroupByOutputType[P]>
        }
      >
    >


  export type TestimonialSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    authorId?: boolean
    authorName?: boolean
    authorRole?: boolean
    content?: boolean
    rating?: boolean
    createdAt?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
    author?: boolean | Testimonial$authorArgs<ExtArgs>
  }, ExtArgs["result"]["testimonial"]>



  export type TestimonialSelectScalar = {
    id?: boolean
    professionalId?: boolean
    authorId?: boolean
    authorName?: boolean
    authorRole?: boolean
    content?: boolean
    rating?: boolean
    createdAt?: boolean
  }

  export type TestimonialOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "authorId" | "authorName" | "authorRole" | "content" | "rating" | "createdAt", ExtArgs["result"]["testimonial"]>
  export type TestimonialInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
    author?: boolean | Testimonial$authorArgs<ExtArgs>
  }

  export type $TestimonialPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Testimonial"
    objects: {
      professional: Prisma.$ProfessionalPayload<ExtArgs>
      author: Prisma.$UserPayload<ExtArgs> | null
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      authorId: string | null
      authorName: string | null
      authorRole: string | null
      content: string
      rating: number
      createdAt: Date
    }, ExtArgs["result"]["testimonial"]>
    composites: {}
  }

  type TestimonialGetPayload<S extends boolean | null | undefined | TestimonialDefaultArgs> = $Result.GetResult<Prisma.$TestimonialPayload, S>

  type TestimonialCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<TestimonialFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TestimonialCountAggregateInputType | true
    }

  export interface TestimonialDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Testimonial'], meta: { name: 'Testimonial' } }
    /**
     * Find zero or one Testimonial that matches the filter.
     * @param {TestimonialFindUniqueArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends TestimonialFindUniqueArgs>(args: SelectSubset<T, TestimonialFindUniqueArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Testimonial that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {TestimonialFindUniqueOrThrowArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends TestimonialFindUniqueOrThrowArgs>(args: SelectSubset<T, TestimonialFindUniqueOrThrowArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Testimonial that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialFindFirstArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends TestimonialFindFirstArgs>(args?: SelectSubset<T, TestimonialFindFirstArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Testimonial that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialFindFirstOrThrowArgs} args - Arguments to find a Testimonial
     * @example
     * // Get one Testimonial
     * const testimonial = await prisma.testimonial.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends TestimonialFindFirstOrThrowArgs>(args?: SelectSubset<T, TestimonialFindFirstOrThrowArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Testimonials that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Testimonials
     * const testimonials = await prisma.testimonial.findMany()
     * 
     * // Get first 10 Testimonials
     * const testimonials = await prisma.testimonial.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const testimonialWithIdOnly = await prisma.testimonial.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends TestimonialFindManyArgs>(args?: SelectSubset<T, TestimonialFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Testimonial.
     * @param {TestimonialCreateArgs} args - Arguments to create a Testimonial.
     * @example
     * // Create one Testimonial
     * const Testimonial = await prisma.testimonial.create({
     *   data: {
     *     // ... data to create a Testimonial
     *   }
     * })
     * 
     */
    create<T extends TestimonialCreateArgs>(args: SelectSubset<T, TestimonialCreateArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Testimonials.
     * @param {TestimonialCreateManyArgs} args - Arguments to create many Testimonials.
     * @example
     * // Create many Testimonials
     * const testimonial = await prisma.testimonial.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends TestimonialCreateManyArgs>(args?: SelectSubset<T, TestimonialCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Testimonial.
     * @param {TestimonialDeleteArgs} args - Arguments to delete one Testimonial.
     * @example
     * // Delete one Testimonial
     * const Testimonial = await prisma.testimonial.delete({
     *   where: {
     *     // ... filter to delete one Testimonial
     *   }
     * })
     * 
     */
    delete<T extends TestimonialDeleteArgs>(args: SelectSubset<T, TestimonialDeleteArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Testimonial.
     * @param {TestimonialUpdateArgs} args - Arguments to update one Testimonial.
     * @example
     * // Update one Testimonial
     * const testimonial = await prisma.testimonial.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends TestimonialUpdateArgs>(args: SelectSubset<T, TestimonialUpdateArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Testimonials.
     * @param {TestimonialDeleteManyArgs} args - Arguments to filter Testimonials to delete.
     * @example
     * // Delete a few Testimonials
     * const { count } = await prisma.testimonial.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends TestimonialDeleteManyArgs>(args?: SelectSubset<T, TestimonialDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Testimonials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Testimonials
     * const testimonial = await prisma.testimonial.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends TestimonialUpdateManyArgs>(args: SelectSubset<T, TestimonialUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Testimonial.
     * @param {TestimonialUpsertArgs} args - Arguments to update or create a Testimonial.
     * @example
     * // Update or create a Testimonial
     * const testimonial = await prisma.testimonial.upsert({
     *   create: {
     *     // ... data to create a Testimonial
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Testimonial we want to update
     *   }
     * })
     */
    upsert<T extends TestimonialUpsertArgs>(args: SelectSubset<T, TestimonialUpsertArgs<ExtArgs>>): Prisma__TestimonialClient<$Result.GetResult<Prisma.$TestimonialPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Testimonials.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialCountArgs} args - Arguments to filter Testimonials to count.
     * @example
     * // Count the number of Testimonials
     * const count = await prisma.testimonial.count({
     *   where: {
     *     // ... the filter for the Testimonials we want to count
     *   }
     * })
    **/
    count<T extends TestimonialCountArgs>(
      args?: Subset<T, TestimonialCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TestimonialCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Testimonial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TestimonialAggregateArgs>(args: Subset<T, TestimonialAggregateArgs>): Prisma.PrismaPromise<GetTestimonialAggregateType<T>>

    /**
     * Group by Testimonial.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TestimonialGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends TestimonialGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: TestimonialGroupByArgs['orderBy'] }
        : { orderBy?: TestimonialGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, TestimonialGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTestimonialGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Testimonial model
   */
  readonly fields: TestimonialFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Testimonial.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__TestimonialClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    author<T extends Testimonial$authorArgs<ExtArgs> = {}>(args?: Subset<T, Testimonial$authorArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Testimonial model
   */
  interface TestimonialFieldRefs {
    readonly id: FieldRef<"Testimonial", 'String'>
    readonly professionalId: FieldRef<"Testimonial", 'String'>
    readonly authorId: FieldRef<"Testimonial", 'String'>
    readonly authorName: FieldRef<"Testimonial", 'String'>
    readonly authorRole: FieldRef<"Testimonial", 'String'>
    readonly content: FieldRef<"Testimonial", 'String'>
    readonly rating: FieldRef<"Testimonial", 'Int'>
    readonly createdAt: FieldRef<"Testimonial", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Testimonial findUnique
   */
  export type TestimonialFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial findUniqueOrThrow
   */
  export type TestimonialFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial findFirst
   */
  export type TestimonialFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Testimonials.
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Testimonials.
     */
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Testimonial findFirstOrThrow
   */
  export type TestimonialFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonial to fetch.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Testimonials.
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Testimonials.
     */
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Testimonial findMany
   */
  export type TestimonialFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter, which Testimonials to fetch.
     */
    where?: TestimonialWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Testimonials to fetch.
     */
    orderBy?: TestimonialOrderByWithRelationInput | TestimonialOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Testimonials.
     */
    cursor?: TestimonialWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Testimonials from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Testimonials.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Testimonials.
     */
    distinct?: TestimonialScalarFieldEnum | TestimonialScalarFieldEnum[]
  }

  /**
   * Testimonial create
   */
  export type TestimonialCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * The data needed to create a Testimonial.
     */
    data: XOR<TestimonialCreateInput, TestimonialUncheckedCreateInput>
  }

  /**
   * Testimonial createMany
   */
  export type TestimonialCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Testimonials.
     */
    data: TestimonialCreateManyInput | TestimonialCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Testimonial update
   */
  export type TestimonialUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * The data needed to update a Testimonial.
     */
    data: XOR<TestimonialUpdateInput, TestimonialUncheckedUpdateInput>
    /**
     * Choose, which Testimonial to update.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial updateMany
   */
  export type TestimonialUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Testimonials.
     */
    data: XOR<TestimonialUpdateManyMutationInput, TestimonialUncheckedUpdateManyInput>
    /**
     * Filter which Testimonials to update
     */
    where?: TestimonialWhereInput
    /**
     * Limit how many Testimonials to update.
     */
    limit?: number
  }

  /**
   * Testimonial upsert
   */
  export type TestimonialUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * The filter to search for the Testimonial to update in case it exists.
     */
    where: TestimonialWhereUniqueInput
    /**
     * In case the Testimonial found by the `where` argument doesn't exist, create a new Testimonial with this data.
     */
    create: XOR<TestimonialCreateInput, TestimonialUncheckedCreateInput>
    /**
     * In case the Testimonial was found with the provided `where` argument, update it with this data.
     */
    update: XOR<TestimonialUpdateInput, TestimonialUncheckedUpdateInput>
  }

  /**
   * Testimonial delete
   */
  export type TestimonialDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
    /**
     * Filter which Testimonial to delete.
     */
    where: TestimonialWhereUniqueInput
  }

  /**
   * Testimonial deleteMany
   */
  export type TestimonialDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Testimonials to delete
     */
    where?: TestimonialWhereInput
    /**
     * Limit how many Testimonials to delete.
     */
    limit?: number
  }

  /**
   * Testimonial.author
   */
  export type Testimonial$authorArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    where?: UserWhereInput
  }

  /**
   * Testimonial without action
   */
  export type TestimonialDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Testimonial
     */
    select?: TestimonialSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Testimonial
     */
    omit?: TestimonialOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: TestimonialInclude<ExtArgs> | null
  }


  /**
   * Model Appointment
   */

  export type AggregateAppointment = {
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  export type AppointmentMinAggregateOutputType = {
    id: string | null
    orderId: string | null
    professionalId: string | null
    clientId: string | null
    scheduledAt: Date | null
    address: string | null
    serviceName: string | null
    status: $Enums.AppointmentStatus | null
    notes: string | null
    createdAt: Date | null
  }

  export type AppointmentMaxAggregateOutputType = {
    id: string | null
    orderId: string | null
    professionalId: string | null
    clientId: string | null
    scheduledAt: Date | null
    address: string | null
    serviceName: string | null
    status: $Enums.AppointmentStatus | null
    notes: string | null
    createdAt: Date | null
  }

  export type AppointmentCountAggregateOutputType = {
    id: number
    orderId: number
    professionalId: number
    clientId: number
    scheduledAt: number
    address: number
    serviceName: number
    status: number
    notes: number
    createdAt: number
    _all: number
  }


  export type AppointmentMinAggregateInputType = {
    id?: true
    orderId?: true
    professionalId?: true
    clientId?: true
    scheduledAt?: true
    address?: true
    serviceName?: true
    status?: true
    notes?: true
    createdAt?: true
  }

  export type AppointmentMaxAggregateInputType = {
    id?: true
    orderId?: true
    professionalId?: true
    clientId?: true
    scheduledAt?: true
    address?: true
    serviceName?: true
    status?: true
    notes?: true
    createdAt?: true
  }

  export type AppointmentCountAggregateInputType = {
    id?: true
    orderId?: true
    professionalId?: true
    clientId?: true
    scheduledAt?: true
    address?: true
    serviceName?: true
    status?: true
    notes?: true
    createdAt?: true
    _all?: true
  }

  export type AppointmentAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointment to aggregate.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Appointments
    **/
    _count?: true | AppointmentCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AppointmentMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AppointmentMaxAggregateInputType
  }

  export type GetAppointmentAggregateType<T extends AppointmentAggregateArgs> = {
        [P in keyof T & keyof AggregateAppointment]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAppointment[P]>
      : GetScalarType<T[P], AggregateAppointment[P]>
  }




  export type AppointmentGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: AppointmentWhereInput
    orderBy?: AppointmentOrderByWithAggregationInput | AppointmentOrderByWithAggregationInput[]
    by: AppointmentScalarFieldEnum[] | AppointmentScalarFieldEnum
    having?: AppointmentScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AppointmentCountAggregateInputType | true
    _min?: AppointmentMinAggregateInputType
    _max?: AppointmentMaxAggregateInputType
  }

  export type AppointmentGroupByOutputType = {
    id: string
    orderId: string | null
    professionalId: string
    clientId: string
    scheduledAt: Date
    address: string | null
    serviceName: string | null
    status: $Enums.AppointmentStatus
    notes: string | null
    createdAt: Date
    _count: AppointmentCountAggregateOutputType | null
    _min: AppointmentMinAggregateOutputType | null
    _max: AppointmentMaxAggregateOutputType | null
  }

  type GetAppointmentGroupByPayload<T extends AppointmentGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AppointmentGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AppointmentGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
            : GetScalarType<T[P], AppointmentGroupByOutputType[P]>
        }
      >
    >


  export type AppointmentSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    orderId?: boolean
    professionalId?: boolean
    clientId?: boolean
    scheduledAt?: boolean
    address?: boolean
    serviceName?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
    order?: boolean | Appointment$orderArgs<ExtArgs>
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["appointment"]>



  export type AppointmentSelectScalar = {
    id?: boolean
    orderId?: boolean
    professionalId?: boolean
    clientId?: boolean
    scheduledAt?: boolean
    address?: boolean
    serviceName?: boolean
    status?: boolean
    notes?: boolean
    createdAt?: boolean
  }

  export type AppointmentOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "orderId" | "professionalId" | "clientId" | "scheduledAt" | "address" | "serviceName" | "status" | "notes" | "createdAt", ExtArgs["result"]["appointment"]>
  export type AppointmentInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    order?: boolean | Appointment$orderArgs<ExtArgs>
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }

  export type $AppointmentPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Appointment"
    objects: {
      order: Prisma.$OrderPayload<ExtArgs> | null
      professional: Prisma.$ProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      orderId: string | null
      professionalId: string
      clientId: string
      scheduledAt: Date
      address: string | null
      serviceName: string | null
      status: $Enums.AppointmentStatus
      notes: string | null
      createdAt: Date
    }, ExtArgs["result"]["appointment"]>
    composites: {}
  }

  type AppointmentGetPayload<S extends boolean | null | undefined | AppointmentDefaultArgs> = $Result.GetResult<Prisma.$AppointmentPayload, S>

  type AppointmentCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<AppointmentFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AppointmentCountAggregateInputType | true
    }

  export interface AppointmentDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Appointment'], meta: { name: 'Appointment' } }
    /**
     * Find zero or one Appointment that matches the filter.
     * @param {AppointmentFindUniqueArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends AppointmentFindUniqueArgs>(args: SelectSubset<T, AppointmentFindUniqueArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Appointment that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {AppointmentFindUniqueOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends AppointmentFindUniqueOrThrowArgs>(args: SelectSubset<T, AppointmentFindUniqueOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends AppointmentFindFirstArgs>(args?: SelectSubset<T, AppointmentFindFirstArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Appointment that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindFirstOrThrowArgs} args - Arguments to find a Appointment
     * @example
     * // Get one Appointment
     * const appointment = await prisma.appointment.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends AppointmentFindFirstOrThrowArgs>(args?: SelectSubset<T, AppointmentFindFirstOrThrowArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Appointments that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Appointments
     * const appointments = await prisma.appointment.findMany()
     * 
     * // Get first 10 Appointments
     * const appointments = await prisma.appointment.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const appointmentWithIdOnly = await prisma.appointment.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends AppointmentFindManyArgs>(args?: SelectSubset<T, AppointmentFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Appointment.
     * @param {AppointmentCreateArgs} args - Arguments to create a Appointment.
     * @example
     * // Create one Appointment
     * const Appointment = await prisma.appointment.create({
     *   data: {
     *     // ... data to create a Appointment
     *   }
     * })
     * 
     */
    create<T extends AppointmentCreateArgs>(args: SelectSubset<T, AppointmentCreateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Appointments.
     * @param {AppointmentCreateManyArgs} args - Arguments to create many Appointments.
     * @example
     * // Create many Appointments
     * const appointment = await prisma.appointment.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends AppointmentCreateManyArgs>(args?: SelectSubset<T, AppointmentCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Appointment.
     * @param {AppointmentDeleteArgs} args - Arguments to delete one Appointment.
     * @example
     * // Delete one Appointment
     * const Appointment = await prisma.appointment.delete({
     *   where: {
     *     // ... filter to delete one Appointment
     *   }
     * })
     * 
     */
    delete<T extends AppointmentDeleteArgs>(args: SelectSubset<T, AppointmentDeleteArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Appointment.
     * @param {AppointmentUpdateArgs} args - Arguments to update one Appointment.
     * @example
     * // Update one Appointment
     * const appointment = await prisma.appointment.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends AppointmentUpdateArgs>(args: SelectSubset<T, AppointmentUpdateArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Appointments.
     * @param {AppointmentDeleteManyArgs} args - Arguments to filter Appointments to delete.
     * @example
     * // Delete a few Appointments
     * const { count } = await prisma.appointment.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends AppointmentDeleteManyArgs>(args?: SelectSubset<T, AppointmentDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Appointments
     * const appointment = await prisma.appointment.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends AppointmentUpdateManyArgs>(args: SelectSubset<T, AppointmentUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Appointment.
     * @param {AppointmentUpsertArgs} args - Arguments to update or create a Appointment.
     * @example
     * // Update or create a Appointment
     * const appointment = await prisma.appointment.upsert({
     *   create: {
     *     // ... data to create a Appointment
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Appointment we want to update
     *   }
     * })
     */
    upsert<T extends AppointmentUpsertArgs>(args: SelectSubset<T, AppointmentUpsertArgs<ExtArgs>>): Prisma__AppointmentClient<$Result.GetResult<Prisma.$AppointmentPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Appointments.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentCountArgs} args - Arguments to filter Appointments to count.
     * @example
     * // Count the number of Appointments
     * const count = await prisma.appointment.count({
     *   where: {
     *     // ... the filter for the Appointments we want to count
     *   }
     * })
    **/
    count<T extends AppointmentCountArgs>(
      args?: Subset<T, AppointmentCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AppointmentCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AppointmentAggregateArgs>(args: Subset<T, AppointmentAggregateArgs>): Prisma.PrismaPromise<GetAppointmentAggregateType<T>>

    /**
     * Group by Appointment.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AppointmentGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends AppointmentGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: AppointmentGroupByArgs['orderBy'] }
        : { orderBy?: AppointmentGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, AppointmentGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAppointmentGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Appointment model
   */
  readonly fields: AppointmentFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Appointment.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__AppointmentClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    order<T extends Appointment$orderArgs<ExtArgs> = {}>(args?: Subset<T, Appointment$orderArgs<ExtArgs>>): Prisma__OrderClient<$Result.GetResult<Prisma.$OrderPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Appointment model
   */
  interface AppointmentFieldRefs {
    readonly id: FieldRef<"Appointment", 'String'>
    readonly orderId: FieldRef<"Appointment", 'String'>
    readonly professionalId: FieldRef<"Appointment", 'String'>
    readonly clientId: FieldRef<"Appointment", 'String'>
    readonly scheduledAt: FieldRef<"Appointment", 'DateTime'>
    readonly address: FieldRef<"Appointment", 'String'>
    readonly serviceName: FieldRef<"Appointment", 'String'>
    readonly status: FieldRef<"Appointment", 'AppointmentStatus'>
    readonly notes: FieldRef<"Appointment", 'String'>
    readonly createdAt: FieldRef<"Appointment", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Appointment findUnique
   */
  export type AppointmentFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findUniqueOrThrow
   */
  export type AppointmentFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment findFirst
   */
  export type AppointmentFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findFirstOrThrow
   */
  export type AppointmentFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointment to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment findMany
   */
  export type AppointmentFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter, which Appointments to fetch.
     */
    where?: AppointmentWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Appointments to fetch.
     */
    orderBy?: AppointmentOrderByWithRelationInput | AppointmentOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Appointments.
     */
    cursor?: AppointmentWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Appointments from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Appointments.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Appointments.
     */
    distinct?: AppointmentScalarFieldEnum | AppointmentScalarFieldEnum[]
  }

  /**
   * Appointment create
   */
  export type AppointmentCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to create a Appointment.
     */
    data: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
  }

  /**
   * Appointment createMany
   */
  export type AppointmentCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Appointments.
     */
    data: AppointmentCreateManyInput | AppointmentCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Appointment update
   */
  export type AppointmentUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The data needed to update a Appointment.
     */
    data: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
    /**
     * Choose, which Appointment to update.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment updateMany
   */
  export type AppointmentUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Appointments.
     */
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyInput>
    /**
     * Filter which Appointments to update
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to update.
     */
    limit?: number
  }

  /**
   * Appointment upsert
   */
  export type AppointmentUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * The filter to search for the Appointment to update in case it exists.
     */
    where: AppointmentWhereUniqueInput
    /**
     * In case the Appointment found by the `where` argument doesn't exist, create a new Appointment with this data.
     */
    create: XOR<AppointmentCreateInput, AppointmentUncheckedCreateInput>
    /**
     * In case the Appointment was found with the provided `where` argument, update it with this data.
     */
    update: XOR<AppointmentUpdateInput, AppointmentUncheckedUpdateInput>
  }

  /**
   * Appointment delete
   */
  export type AppointmentDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
    /**
     * Filter which Appointment to delete.
     */
    where: AppointmentWhereUniqueInput
  }

  /**
   * Appointment deleteMany
   */
  export type AppointmentDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Appointments to delete
     */
    where?: AppointmentWhereInput
    /**
     * Limit how many Appointments to delete.
     */
    limit?: number
  }

  /**
   * Appointment.order
   */
  export type Appointment$orderArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Order
     */
    select?: OrderSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Order
     */
    omit?: OrderOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: OrderInclude<ExtArgs> | null
    where?: OrderWhereInput
  }

  /**
   * Appointment without action
   */
  export type AppointmentDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Appointment
     */
    select?: AppointmentSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Appointment
     */
    omit?: AppointmentOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: AppointmentInclude<ExtArgs> | null
  }


  /**
   * Model Certification
   */

  export type AggregateCertification = {
    _count: CertificationCountAggregateOutputType | null
    _min: CertificationMinAggregateOutputType | null
    _max: CertificationMaxAggregateOutputType | null
  }

  export type CertificationMinAggregateOutputType = {
    id: string | null
    professionalId: string | null
    name: string | null
    issuedAt: Date | null
    expiresAt: Date | null
    issuer: string | null
  }

  export type CertificationMaxAggregateOutputType = {
    id: string | null
    professionalId: string | null
    name: string | null
    issuedAt: Date | null
    expiresAt: Date | null
    issuer: string | null
  }

  export type CertificationCountAggregateOutputType = {
    id: number
    professionalId: number
    name: number
    issuedAt: number
    expiresAt: number
    issuer: number
    _all: number
  }


  export type CertificationMinAggregateInputType = {
    id?: true
    professionalId?: true
    name?: true
    issuedAt?: true
    expiresAt?: true
    issuer?: true
  }

  export type CertificationMaxAggregateInputType = {
    id?: true
    professionalId?: true
    name?: true
    issuedAt?: true
    expiresAt?: true
    issuer?: true
  }

  export type CertificationCountAggregateInputType = {
    id?: true
    professionalId?: true
    name?: true
    issuedAt?: true
    expiresAt?: true
    issuer?: true
    _all?: true
  }

  export type CertificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Certification to aggregate.
     */
    where?: CertificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certifications to fetch.
     */
    orderBy?: CertificationOrderByWithRelationInput | CertificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Certifications
    **/
    _count?: true | CertificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CertificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CertificationMaxAggregateInputType
  }

  export type GetCertificationAggregateType<T extends CertificationAggregateArgs> = {
        [P in keyof T & keyof AggregateCertification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCertification[P]>
      : GetScalarType<T[P], AggregateCertification[P]>
  }




  export type CertificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CertificationWhereInput
    orderBy?: CertificationOrderByWithAggregationInput | CertificationOrderByWithAggregationInput[]
    by: CertificationScalarFieldEnum[] | CertificationScalarFieldEnum
    having?: CertificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CertificationCountAggregateInputType | true
    _min?: CertificationMinAggregateInputType
    _max?: CertificationMaxAggregateInputType
  }

  export type CertificationGroupByOutputType = {
    id: string
    professionalId: string
    name: string
    issuedAt: Date | null
    expiresAt: Date | null
    issuer: string | null
    _count: CertificationCountAggregateOutputType | null
    _min: CertificationMinAggregateOutputType | null
    _max: CertificationMaxAggregateOutputType | null
  }

  type GetCertificationGroupByPayload<T extends CertificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CertificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CertificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CertificationGroupByOutputType[P]>
            : GetScalarType<T[P], CertificationGroupByOutputType[P]>
        }
      >
    >


  export type CertificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    professionalId?: boolean
    name?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    issuer?: boolean
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["certification"]>



  export type CertificationSelectScalar = {
    id?: boolean
    professionalId?: boolean
    name?: boolean
    issuedAt?: boolean
    expiresAt?: boolean
    issuer?: boolean
  }

  export type CertificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "professionalId" | "name" | "issuedAt" | "expiresAt" | "issuer", ExtArgs["result"]["certification"]>
  export type CertificationInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    professional?: boolean | ProfessionalDefaultArgs<ExtArgs>
  }

  export type $CertificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Certification"
    objects: {
      professional: Prisma.$ProfessionalPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      professionalId: string
      name: string
      issuedAt: Date | null
      expiresAt: Date | null
      issuer: string | null
    }, ExtArgs["result"]["certification"]>
    composites: {}
  }

  type CertificationGetPayload<S extends boolean | null | undefined | CertificationDefaultArgs> = $Result.GetResult<Prisma.$CertificationPayload, S>

  type CertificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CertificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CertificationCountAggregateInputType | true
    }

  export interface CertificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Certification'], meta: { name: 'Certification' } }
    /**
     * Find zero or one Certification that matches the filter.
     * @param {CertificationFindUniqueArgs} args - Arguments to find a Certification
     * @example
     * // Get one Certification
     * const certification = await prisma.certification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CertificationFindUniqueArgs>(args: SelectSubset<T, CertificationFindUniqueArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Certification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CertificationFindUniqueOrThrowArgs} args - Arguments to find a Certification
     * @example
     * // Get one Certification
     * const certification = await prisma.certification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CertificationFindUniqueOrThrowArgs>(args: SelectSubset<T, CertificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Certification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationFindFirstArgs} args - Arguments to find a Certification
     * @example
     * // Get one Certification
     * const certification = await prisma.certification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CertificationFindFirstArgs>(args?: SelectSubset<T, CertificationFindFirstArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Certification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationFindFirstOrThrowArgs} args - Arguments to find a Certification
     * @example
     * // Get one Certification
     * const certification = await prisma.certification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CertificationFindFirstOrThrowArgs>(args?: SelectSubset<T, CertificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Certifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Certifications
     * const certifications = await prisma.certification.findMany()
     * 
     * // Get first 10 Certifications
     * const certifications = await prisma.certification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const certificationWithIdOnly = await prisma.certification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends CertificationFindManyArgs>(args?: SelectSubset<T, CertificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Certification.
     * @param {CertificationCreateArgs} args - Arguments to create a Certification.
     * @example
     * // Create one Certification
     * const Certification = await prisma.certification.create({
     *   data: {
     *     // ... data to create a Certification
     *   }
     * })
     * 
     */
    create<T extends CertificationCreateArgs>(args: SelectSubset<T, CertificationCreateArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Certifications.
     * @param {CertificationCreateManyArgs} args - Arguments to create many Certifications.
     * @example
     * // Create many Certifications
     * const certification = await prisma.certification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CertificationCreateManyArgs>(args?: SelectSubset<T, CertificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Certification.
     * @param {CertificationDeleteArgs} args - Arguments to delete one Certification.
     * @example
     * // Delete one Certification
     * const Certification = await prisma.certification.delete({
     *   where: {
     *     // ... filter to delete one Certification
     *   }
     * })
     * 
     */
    delete<T extends CertificationDeleteArgs>(args: SelectSubset<T, CertificationDeleteArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Certification.
     * @param {CertificationUpdateArgs} args - Arguments to update one Certification.
     * @example
     * // Update one Certification
     * const certification = await prisma.certification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CertificationUpdateArgs>(args: SelectSubset<T, CertificationUpdateArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Certifications.
     * @param {CertificationDeleteManyArgs} args - Arguments to filter Certifications to delete.
     * @example
     * // Delete a few Certifications
     * const { count } = await prisma.certification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CertificationDeleteManyArgs>(args?: SelectSubset<T, CertificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Certifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Certifications
     * const certification = await prisma.certification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CertificationUpdateManyArgs>(args: SelectSubset<T, CertificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Certification.
     * @param {CertificationUpsertArgs} args - Arguments to update or create a Certification.
     * @example
     * // Update or create a Certification
     * const certification = await prisma.certification.upsert({
     *   create: {
     *     // ... data to create a Certification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Certification we want to update
     *   }
     * })
     */
    upsert<T extends CertificationUpsertArgs>(args: SelectSubset<T, CertificationUpsertArgs<ExtArgs>>): Prisma__CertificationClient<$Result.GetResult<Prisma.$CertificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Certifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationCountArgs} args - Arguments to filter Certifications to count.
     * @example
     * // Count the number of Certifications
     * const count = await prisma.certification.count({
     *   where: {
     *     // ... the filter for the Certifications we want to count
     *   }
     * })
    **/
    count<T extends CertificationCountArgs>(
      args?: Subset<T, CertificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CertificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Certification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CertificationAggregateArgs>(args: Subset<T, CertificationAggregateArgs>): Prisma.PrismaPromise<GetCertificationAggregateType<T>>

    /**
     * Group by Certification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CertificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CertificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CertificationGroupByArgs['orderBy'] }
        : { orderBy?: CertificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CertificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCertificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Certification model
   */
  readonly fields: CertificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Certification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CertificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    professional<T extends ProfessionalDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ProfessionalDefaultArgs<ExtArgs>>): Prisma__ProfessionalClient<$Result.GetResult<Prisma.$ProfessionalPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Certification model
   */
  interface CertificationFieldRefs {
    readonly id: FieldRef<"Certification", 'String'>
    readonly professionalId: FieldRef<"Certification", 'String'>
    readonly name: FieldRef<"Certification", 'String'>
    readonly issuedAt: FieldRef<"Certification", 'DateTime'>
    readonly expiresAt: FieldRef<"Certification", 'DateTime'>
    readonly issuer: FieldRef<"Certification", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Certification findUnique
   */
  export type CertificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * Filter, which Certification to fetch.
     */
    where: CertificationWhereUniqueInput
  }

  /**
   * Certification findUniqueOrThrow
   */
  export type CertificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * Filter, which Certification to fetch.
     */
    where: CertificationWhereUniqueInput
  }

  /**
   * Certification findFirst
   */
  export type CertificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * Filter, which Certification to fetch.
     */
    where?: CertificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certifications to fetch.
     */
    orderBy?: CertificationOrderByWithRelationInput | CertificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Certifications.
     */
    cursor?: CertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certifications.
     */
    distinct?: CertificationScalarFieldEnum | CertificationScalarFieldEnum[]
  }

  /**
   * Certification findFirstOrThrow
   */
  export type CertificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * Filter, which Certification to fetch.
     */
    where?: CertificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certifications to fetch.
     */
    orderBy?: CertificationOrderByWithRelationInput | CertificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Certifications.
     */
    cursor?: CertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certifications.
     */
    distinct?: CertificationScalarFieldEnum | CertificationScalarFieldEnum[]
  }

  /**
   * Certification findMany
   */
  export type CertificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * Filter, which Certifications to fetch.
     */
    where?: CertificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Certifications to fetch.
     */
    orderBy?: CertificationOrderByWithRelationInput | CertificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Certifications.
     */
    cursor?: CertificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Certifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Certifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Certifications.
     */
    distinct?: CertificationScalarFieldEnum | CertificationScalarFieldEnum[]
  }

  /**
   * Certification create
   */
  export type CertificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * The data needed to create a Certification.
     */
    data: XOR<CertificationCreateInput, CertificationUncheckedCreateInput>
  }

  /**
   * Certification createMany
   */
  export type CertificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Certifications.
     */
    data: CertificationCreateManyInput | CertificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Certification update
   */
  export type CertificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * The data needed to update a Certification.
     */
    data: XOR<CertificationUpdateInput, CertificationUncheckedUpdateInput>
    /**
     * Choose, which Certification to update.
     */
    where: CertificationWhereUniqueInput
  }

  /**
   * Certification updateMany
   */
  export type CertificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Certifications.
     */
    data: XOR<CertificationUpdateManyMutationInput, CertificationUncheckedUpdateManyInput>
    /**
     * Filter which Certifications to update
     */
    where?: CertificationWhereInput
    /**
     * Limit how many Certifications to update.
     */
    limit?: number
  }

  /**
   * Certification upsert
   */
  export type CertificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * The filter to search for the Certification to update in case it exists.
     */
    where: CertificationWhereUniqueInput
    /**
     * In case the Certification found by the `where` argument doesn't exist, create a new Certification with this data.
     */
    create: XOR<CertificationCreateInput, CertificationUncheckedCreateInput>
    /**
     * In case the Certification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CertificationUpdateInput, CertificationUncheckedUpdateInput>
  }

  /**
   * Certification delete
   */
  export type CertificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
    /**
     * Filter which Certification to delete.
     */
    where: CertificationWhereUniqueInput
  }

  /**
   * Certification deleteMany
   */
  export type CertificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Certifications to delete
     */
    where?: CertificationWhereInput
    /**
     * Limit how many Certifications to delete.
     */
    limit?: number
  }

  /**
   * Certification without action
   */
  export type CertificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Certification
     */
    select?: CertificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Certification
     */
    omit?: CertificationOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CertificationInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    phone: 'phone',
    avatarUrl: 'avatarUrl',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ClientScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    createdAt: 'createdAt'
  };

  export type ClientScalarFieldEnum = (typeof ClientScalarFieldEnum)[keyof typeof ClientScalarFieldEnum]


  export const ProfessionalScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    specialty: 'specialty',
    bio: 'bio',
    phone: 'phone',
    location: 'location',
    addressStreet: 'addressStreet',
    addressNumber: 'addressNumber',
    addressComplement: 'addressComplement',
    addressNeighborhood: 'addressNeighborhood',
    addressCity: 'addressCity',
    addressState: 'addressState',
    addressCep: 'addressCep',
    cpf: 'cpf',
    isVerified: 'isVerified',
    isAvailable: 'isAvailable',
    rating: 'rating',
    reviewCount: 'reviewCount',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ProfessionalScalarFieldEnum = (typeof ProfessionalScalarFieldEnum)[keyof typeof ProfessionalScalarFieldEnum]


  export const CategoryScalarFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description',
    createdAt: 'createdAt'
  };

  export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum]


  export const ProfessionalCategoryScalarFieldEnum: {
    professionalId: 'professionalId',
    categoryId: 'categoryId'
  };

  export type ProfessionalCategoryScalarFieldEnum = (typeof ProfessionalCategoryScalarFieldEnum)[keyof typeof ProfessionalCategoryScalarFieldEnum]


  export const ServiceScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    categoryId: 'categoryId',
    title: 'title',
    priceText: 'priceText',
    priceValue: 'priceValue',
    duration: 'duration',
    status: 'status',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type ServiceScalarFieldEnum = (typeof ServiceScalarFieldEnum)[keyof typeof ServiceScalarFieldEnum]


  export const OrderScalarFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    professionalId: 'professionalId',
    serviceId: 'serviceId',
    categoryId: 'categoryId',
    status: 'status',
    serviceType: 'serviceType',
    description: 'description',
    locationCep: 'locationCep',
    address: 'address',
    urgency: 'urgency',
    attachments: 'attachments',
    agreedPrice: 'agreedPrice',
    scheduledAt: 'scheduledAt',
    notes: 'notes',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type OrderScalarFieldEnum = (typeof OrderScalarFieldEnum)[keyof typeof OrderScalarFieldEnum]


  export const PortfolioItemScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    categoryId: 'categoryId',
    title: 'title',
    imageUrl: 'imageUrl',
    year: 'year',
    createdAt: 'createdAt'
  };

  export type PortfolioItemScalarFieldEnum = (typeof PortfolioItemScalarFieldEnum)[keyof typeof PortfolioItemScalarFieldEnum]


  export const TestimonialScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    authorId: 'authorId',
    authorName: 'authorName',
    authorRole: 'authorRole',
    content: 'content',
    rating: 'rating',
    createdAt: 'createdAt'
  };

  export type TestimonialScalarFieldEnum = (typeof TestimonialScalarFieldEnum)[keyof typeof TestimonialScalarFieldEnum]


  export const AppointmentScalarFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    professionalId: 'professionalId',
    clientId: 'clientId',
    scheduledAt: 'scheduledAt',
    address: 'address',
    serviceName: 'serviceName',
    status: 'status',
    notes: 'notes',
    createdAt: 'createdAt'
  };

  export type AppointmentScalarFieldEnum = (typeof AppointmentScalarFieldEnum)[keyof typeof AppointmentScalarFieldEnum]


  export const CertificationScalarFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    name: 'name',
    issuedAt: 'issuedAt',
    expiresAt: 'expiresAt',
    issuer: 'issuer'
  };

  export type CertificationScalarFieldEnum = (typeof CertificationScalarFieldEnum)[keyof typeof CertificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullableJsonNullValueInput: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull
  };

  export type NullableJsonNullValueInput = (typeof NullableJsonNullValueInput)[keyof typeof NullableJsonNullValueInput]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const UserOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    password: 'password',
    phone: 'phone',
    avatarUrl: 'avatarUrl'
  };

  export type UserOrderByRelevanceFieldEnum = (typeof UserOrderByRelevanceFieldEnum)[keyof typeof UserOrderByRelevanceFieldEnum]


  export const ClientOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId'
  };

  export type ClientOrderByRelevanceFieldEnum = (typeof ClientOrderByRelevanceFieldEnum)[keyof typeof ClientOrderByRelevanceFieldEnum]


  export const ProfessionalOrderByRelevanceFieldEnum: {
    id: 'id',
    userId: 'userId',
    specialty: 'specialty',
    bio: 'bio',
    phone: 'phone',
    location: 'location',
    addressStreet: 'addressStreet',
    addressNumber: 'addressNumber',
    addressComplement: 'addressComplement',
    addressNeighborhood: 'addressNeighborhood',
    addressCity: 'addressCity',
    addressState: 'addressState',
    addressCep: 'addressCep',
    cpf: 'cpf'
  };

  export type ProfessionalOrderByRelevanceFieldEnum = (typeof ProfessionalOrderByRelevanceFieldEnum)[keyof typeof ProfessionalOrderByRelevanceFieldEnum]


  export const CategoryOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    slug: 'slug',
    description: 'description'
  };

  export type CategoryOrderByRelevanceFieldEnum = (typeof CategoryOrderByRelevanceFieldEnum)[keyof typeof CategoryOrderByRelevanceFieldEnum]


  export const ProfessionalCategoryOrderByRelevanceFieldEnum: {
    professionalId: 'professionalId',
    categoryId: 'categoryId'
  };

  export type ProfessionalCategoryOrderByRelevanceFieldEnum = (typeof ProfessionalCategoryOrderByRelevanceFieldEnum)[keyof typeof ProfessionalCategoryOrderByRelevanceFieldEnum]


  export const ServiceOrderByRelevanceFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    categoryId: 'categoryId',
    title: 'title',
    priceText: 'priceText',
    duration: 'duration'
  };

  export type ServiceOrderByRelevanceFieldEnum = (typeof ServiceOrderByRelevanceFieldEnum)[keyof typeof ServiceOrderByRelevanceFieldEnum]


  export const JsonNullValueFilter: {
    DbNull: typeof DbNull,
    JsonNull: typeof JsonNull,
    AnyNull: typeof AnyNull
  };

  export type JsonNullValueFilter = (typeof JsonNullValueFilter)[keyof typeof JsonNullValueFilter]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const OrderOrderByRelevanceFieldEnum: {
    id: 'id',
    clientId: 'clientId',
    professionalId: 'professionalId',
    serviceId: 'serviceId',
    categoryId: 'categoryId',
    serviceType: 'serviceType',
    description: 'description',
    locationCep: 'locationCep',
    address: 'address',
    urgency: 'urgency',
    notes: 'notes'
  };

  export type OrderOrderByRelevanceFieldEnum = (typeof OrderOrderByRelevanceFieldEnum)[keyof typeof OrderOrderByRelevanceFieldEnum]


  export const PortfolioItemOrderByRelevanceFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    categoryId: 'categoryId',
    title: 'title',
    imageUrl: 'imageUrl'
  };

  export type PortfolioItemOrderByRelevanceFieldEnum = (typeof PortfolioItemOrderByRelevanceFieldEnum)[keyof typeof PortfolioItemOrderByRelevanceFieldEnum]


  export const TestimonialOrderByRelevanceFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    authorId: 'authorId',
    authorName: 'authorName',
    authorRole: 'authorRole',
    content: 'content'
  };

  export type TestimonialOrderByRelevanceFieldEnum = (typeof TestimonialOrderByRelevanceFieldEnum)[keyof typeof TestimonialOrderByRelevanceFieldEnum]


  export const AppointmentOrderByRelevanceFieldEnum: {
    id: 'id',
    orderId: 'orderId',
    professionalId: 'professionalId',
    clientId: 'clientId',
    address: 'address',
    serviceName: 'serviceName',
    notes: 'notes'
  };

  export type AppointmentOrderByRelevanceFieldEnum = (typeof AppointmentOrderByRelevanceFieldEnum)[keyof typeof AppointmentOrderByRelevanceFieldEnum]


  export const CertificationOrderByRelevanceFieldEnum: {
    id: 'id',
    professionalId: 'professionalId',
    name: 'name',
    issuer: 'issuer'
  };

  export type CertificationOrderByRelevanceFieldEnum = (typeof CertificationOrderByRelevanceFieldEnum)[keyof typeof CertificationOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Decimal'
   */
  export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'ServiceStatus'
   */
  export type EnumServiceStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'ServiceStatus'>
    


  /**
   * Reference to a field of type 'OrderStatus'
   */
  export type EnumOrderStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'OrderStatus'>
    


  /**
   * Reference to a field of type 'Json'
   */
  export type JsonFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Json'>
    


  /**
   * Reference to a field of type 'QueryMode'
   */
  export type EnumQueryModeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'QueryMode'>
    


  /**
   * Reference to a field of type 'AppointmentStatus'
   */
  export type EnumAppointmentStatusFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'AppointmentStatus'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    name?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    client?: XOR<ClientNullableScalarRelationFilter, ClientWhereInput> | null
    professional?: XOR<ProfessionalNullableScalarRelationFilter, ProfessionalWhereInput> | null
    testimonials?: TestimonialListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    client?: ClientOrderByWithRelationInput
    professional?: ProfessionalOrderByWithRelationInput
    testimonials?: TestimonialOrderByRelationAggregateInput
    _relevance?: UserOrderByRelevanceInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    name?: StringFilter<"User"> | string
    password?: StringFilter<"User"> | string
    phone?: StringNullableFilter<"User"> | string | null
    avatarUrl?: StringNullableFilter<"User"> | string | null
    createdAt?: DateTimeFilter<"User"> | Date | string
    updatedAt?: DateTimeFilter<"User"> | Date | string
    client?: XOR<ClientNullableScalarRelationFilter, ClientWhereInput> | null
    professional?: XOR<ProfessionalNullableScalarRelationFilter, ProfessionalWhereInput> | null
    testimonials?: TestimonialListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrderInput | SortOrder
    avatarUrl?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    name?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    password?: StringWithAggregatesFilter<"User"> | string
    phone?: StringNullableWithAggregatesFilter<"User"> | string | null
    avatarUrl?: StringNullableWithAggregatesFilter<"User"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"User"> | Date | string
  }

  export type ClientWhereInput = {
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    id?: StringFilter<"Client"> | string
    userId?: StringFilter<"Client"> | string
    createdAt?: DateTimeFilter<"Client"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    orders?: OrderListRelationFilter
  }

  export type ClientOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    user?: UserOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
    _relevance?: ClientOrderByRelevanceInput
  }

  export type ClientWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    AND?: ClientWhereInput | ClientWhereInput[]
    OR?: ClientWhereInput[]
    NOT?: ClientWhereInput | ClientWhereInput[]
    createdAt?: DateTimeFilter<"Client"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    orders?: OrderListRelationFilter
  }, "id" | "userId">

  export type ClientOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
    _count?: ClientCountOrderByAggregateInput
    _max?: ClientMaxOrderByAggregateInput
    _min?: ClientMinOrderByAggregateInput
  }

  export type ClientScalarWhereWithAggregatesInput = {
    AND?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    OR?: ClientScalarWhereWithAggregatesInput[]
    NOT?: ClientScalarWhereWithAggregatesInput | ClientScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Client"> | string
    userId?: StringWithAggregatesFilter<"Client"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Client"> | Date | string
  }

  export type ProfessionalWhereInput = {
    AND?: ProfessionalWhereInput | ProfessionalWhereInput[]
    OR?: ProfessionalWhereInput[]
    NOT?: ProfessionalWhereInput | ProfessionalWhereInput[]
    id?: StringFilter<"Professional"> | string
    userId?: StringFilter<"Professional"> | string
    specialty?: StringNullableFilter<"Professional"> | string | null
    bio?: StringNullableFilter<"Professional"> | string | null
    phone?: StringNullableFilter<"Professional"> | string | null
    location?: StringNullableFilter<"Professional"> | string | null
    addressStreet?: StringNullableFilter<"Professional"> | string | null
    addressNumber?: StringNullableFilter<"Professional"> | string | null
    addressComplement?: StringNullableFilter<"Professional"> | string | null
    addressNeighborhood?: StringNullableFilter<"Professional"> | string | null
    addressCity?: StringNullableFilter<"Professional"> | string | null
    addressState?: StringNullableFilter<"Professional"> | string | null
    addressCep?: StringNullableFilter<"Professional"> | string | null
    cpf?: StringNullableFilter<"Professional"> | string | null
    isVerified?: BoolFilter<"Professional"> | boolean
    isAvailable?: BoolFilter<"Professional"> | boolean
    rating?: DecimalFilter<"Professional"> | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFilter<"Professional"> | number
    createdAt?: DateTimeFilter<"Professional"> | Date | string
    updatedAt?: DateTimeFilter<"Professional"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    categories?: ProfessionalCategoryListRelationFilter
    services?: ServiceListRelationFilter
    orders?: OrderListRelationFilter
    portfolio?: PortfolioItemListRelationFilter
    testimonials?: TestimonialListRelationFilter
    appointments?: AppointmentListRelationFilter
    certifications?: CertificationListRelationFilter
  }

  export type ProfessionalOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    specialty?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    addressStreet?: SortOrderInput | SortOrder
    addressNumber?: SortOrderInput | SortOrder
    addressComplement?: SortOrderInput | SortOrder
    addressNeighborhood?: SortOrderInput | SortOrder
    addressCity?: SortOrderInput | SortOrder
    addressState?: SortOrderInput | SortOrder
    addressCep?: SortOrderInput | SortOrder
    cpf?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    isAvailable?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    user?: UserOrderByWithRelationInput
    categories?: ProfessionalCategoryOrderByRelationAggregateInput
    services?: ServiceOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    portfolio?: PortfolioItemOrderByRelationAggregateInput
    testimonials?: TestimonialOrderByRelationAggregateInput
    appointments?: AppointmentOrderByRelationAggregateInput
    certifications?: CertificationOrderByRelationAggregateInput
    _relevance?: ProfessionalOrderByRelevanceInput
  }

  export type ProfessionalWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId?: string
    cpf?: string
    AND?: ProfessionalWhereInput | ProfessionalWhereInput[]
    OR?: ProfessionalWhereInput[]
    NOT?: ProfessionalWhereInput | ProfessionalWhereInput[]
    specialty?: StringNullableFilter<"Professional"> | string | null
    bio?: StringNullableFilter<"Professional"> | string | null
    phone?: StringNullableFilter<"Professional"> | string | null
    location?: StringNullableFilter<"Professional"> | string | null
    addressStreet?: StringNullableFilter<"Professional"> | string | null
    addressNumber?: StringNullableFilter<"Professional"> | string | null
    addressComplement?: StringNullableFilter<"Professional"> | string | null
    addressNeighborhood?: StringNullableFilter<"Professional"> | string | null
    addressCity?: StringNullableFilter<"Professional"> | string | null
    addressState?: StringNullableFilter<"Professional"> | string | null
    addressCep?: StringNullableFilter<"Professional"> | string | null
    isVerified?: BoolFilter<"Professional"> | boolean
    isAvailable?: BoolFilter<"Professional"> | boolean
    rating?: DecimalFilter<"Professional"> | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFilter<"Professional"> | number
    createdAt?: DateTimeFilter<"Professional"> | Date | string
    updatedAt?: DateTimeFilter<"Professional"> | Date | string
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
    categories?: ProfessionalCategoryListRelationFilter
    services?: ServiceListRelationFilter
    orders?: OrderListRelationFilter
    portfolio?: PortfolioItemListRelationFilter
    testimonials?: TestimonialListRelationFilter
    appointments?: AppointmentListRelationFilter
    certifications?: CertificationListRelationFilter
  }, "id" | "userId" | "cpf">

  export type ProfessionalOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    specialty?: SortOrderInput | SortOrder
    bio?: SortOrderInput | SortOrder
    phone?: SortOrderInput | SortOrder
    location?: SortOrderInput | SortOrder
    addressStreet?: SortOrderInput | SortOrder
    addressNumber?: SortOrderInput | SortOrder
    addressComplement?: SortOrderInput | SortOrder
    addressNeighborhood?: SortOrderInput | SortOrder
    addressCity?: SortOrderInput | SortOrder
    addressState?: SortOrderInput | SortOrder
    addressCep?: SortOrderInput | SortOrder
    cpf?: SortOrderInput | SortOrder
    isVerified?: SortOrder
    isAvailable?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ProfessionalCountOrderByAggregateInput
    _avg?: ProfessionalAvgOrderByAggregateInput
    _max?: ProfessionalMaxOrderByAggregateInput
    _min?: ProfessionalMinOrderByAggregateInput
    _sum?: ProfessionalSumOrderByAggregateInput
  }

  export type ProfessionalScalarWhereWithAggregatesInput = {
    AND?: ProfessionalScalarWhereWithAggregatesInput | ProfessionalScalarWhereWithAggregatesInput[]
    OR?: ProfessionalScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalScalarWhereWithAggregatesInput | ProfessionalScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Professional"> | string
    userId?: StringWithAggregatesFilter<"Professional"> | string
    specialty?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    bio?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    phone?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    location?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    addressStreet?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    addressNumber?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    addressComplement?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    addressNeighborhood?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    addressCity?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    addressState?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    addressCep?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    cpf?: StringNullableWithAggregatesFilter<"Professional"> | string | null
    isVerified?: BoolWithAggregatesFilter<"Professional"> | boolean
    isAvailable?: BoolWithAggregatesFilter<"Professional"> | boolean
    rating?: DecimalWithAggregatesFilter<"Professional"> | Decimal | DecimalJsLike | number | string
    reviewCount?: IntWithAggregatesFilter<"Professional"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Professional"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Professional"> | Date | string
  }

  export type CategoryWhereInput = {
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    id?: StringFilter<"Category"> | string
    name?: StringFilter<"Category"> | string
    slug?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    professionals?: ProfessionalCategoryListRelationFilter
    services?: ServiceListRelationFilter
    orders?: OrderListRelationFilter
    portfolio?: PortfolioItemListRelationFilter
  }

  export type CategoryOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    professionals?: ProfessionalCategoryOrderByRelationAggregateInput
    services?: ServiceOrderByRelationAggregateInput
    orders?: OrderOrderByRelationAggregateInput
    portfolio?: PortfolioItemOrderByRelationAggregateInput
    _relevance?: CategoryOrderByRelevanceInput
  }

  export type CategoryWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    slug?: string
    AND?: CategoryWhereInput | CategoryWhereInput[]
    OR?: CategoryWhereInput[]
    NOT?: CategoryWhereInput | CategoryWhereInput[]
    name?: StringFilter<"Category"> | string
    description?: StringNullableFilter<"Category"> | string | null
    createdAt?: DateTimeFilter<"Category"> | Date | string
    professionals?: ProfessionalCategoryListRelationFilter
    services?: ServiceListRelationFilter
    orders?: OrderListRelationFilter
    portfolio?: PortfolioItemListRelationFilter
  }, "id" | "slug">

  export type CategoryOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: CategoryCountOrderByAggregateInput
    _max?: CategoryMaxOrderByAggregateInput
    _min?: CategoryMinOrderByAggregateInput
  }

  export type CategoryScalarWhereWithAggregatesInput = {
    AND?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    OR?: CategoryScalarWhereWithAggregatesInput[]
    NOT?: CategoryScalarWhereWithAggregatesInput | CategoryScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Category"> | string
    name?: StringWithAggregatesFilter<"Category"> | string
    slug?: StringWithAggregatesFilter<"Category"> | string
    description?: StringNullableWithAggregatesFilter<"Category"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Category"> | Date | string
  }

  export type ProfessionalCategoryWhereInput = {
    AND?: ProfessionalCategoryWhereInput | ProfessionalCategoryWhereInput[]
    OR?: ProfessionalCategoryWhereInput[]
    NOT?: ProfessionalCategoryWhereInput | ProfessionalCategoryWhereInput[]
    professionalId?: StringFilter<"ProfessionalCategory"> | string
    categoryId?: StringFilter<"ProfessionalCategory"> | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }

  export type ProfessionalCategoryOrderByWithRelationInput = {
    professionalId?: SortOrder
    categoryId?: SortOrder
    professional?: ProfessionalOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
    _relevance?: ProfessionalCategoryOrderByRelevanceInput
  }

  export type ProfessionalCategoryWhereUniqueInput = Prisma.AtLeast<{
    professionalId_categoryId?: ProfessionalCategoryProfessionalIdCategoryIdCompoundUniqueInput
    AND?: ProfessionalCategoryWhereInput | ProfessionalCategoryWhereInput[]
    OR?: ProfessionalCategoryWhereInput[]
    NOT?: ProfessionalCategoryWhereInput | ProfessionalCategoryWhereInput[]
    professionalId?: StringFilter<"ProfessionalCategory"> | string
    categoryId?: StringFilter<"ProfessionalCategory"> | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
    category?: XOR<CategoryScalarRelationFilter, CategoryWhereInput>
  }, "professionalId_categoryId">

  export type ProfessionalCategoryOrderByWithAggregationInput = {
    professionalId?: SortOrder
    categoryId?: SortOrder
    _count?: ProfessionalCategoryCountOrderByAggregateInput
    _max?: ProfessionalCategoryMaxOrderByAggregateInput
    _min?: ProfessionalCategoryMinOrderByAggregateInput
  }

  export type ProfessionalCategoryScalarWhereWithAggregatesInput = {
    AND?: ProfessionalCategoryScalarWhereWithAggregatesInput | ProfessionalCategoryScalarWhereWithAggregatesInput[]
    OR?: ProfessionalCategoryScalarWhereWithAggregatesInput[]
    NOT?: ProfessionalCategoryScalarWhereWithAggregatesInput | ProfessionalCategoryScalarWhereWithAggregatesInput[]
    professionalId?: StringWithAggregatesFilter<"ProfessionalCategory"> | string
    categoryId?: StringWithAggregatesFilter<"ProfessionalCategory"> | string
  }

  export type ServiceWhereInput = {
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    id?: StringFilter<"Service"> | string
    professionalId?: StringFilter<"Service"> | string
    categoryId?: StringNullableFilter<"Service"> | string | null
    title?: StringFilter<"Service"> | string
    priceText?: StringNullableFilter<"Service"> | string | null
    priceValue?: DecimalNullableFilter<"Service"> | Decimal | DecimalJsLike | number | string | null
    duration?: StringNullableFilter<"Service"> | string | null
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    orders?: OrderListRelationFilter
  }

  export type ServiceOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    title?: SortOrder
    priceText?: SortOrderInput | SortOrder
    priceValue?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    professional?: ProfessionalOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
    orders?: OrderOrderByRelationAggregateInput
    _relevance?: ServiceOrderByRelevanceInput
  }

  export type ServiceWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ServiceWhereInput | ServiceWhereInput[]
    OR?: ServiceWhereInput[]
    NOT?: ServiceWhereInput | ServiceWhereInput[]
    professionalId?: StringFilter<"Service"> | string
    categoryId?: StringNullableFilter<"Service"> | string | null
    title?: StringFilter<"Service"> | string
    priceText?: StringNullableFilter<"Service"> | string | null
    priceValue?: DecimalNullableFilter<"Service"> | Decimal | DecimalJsLike | number | string | null
    duration?: StringNullableFilter<"Service"> | string | null
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    orders?: OrderListRelationFilter
  }, "id">

  export type ServiceOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    title?: SortOrder
    priceText?: SortOrderInput | SortOrder
    priceValue?: SortOrderInput | SortOrder
    duration?: SortOrderInput | SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: ServiceCountOrderByAggregateInput
    _avg?: ServiceAvgOrderByAggregateInput
    _max?: ServiceMaxOrderByAggregateInput
    _min?: ServiceMinOrderByAggregateInput
    _sum?: ServiceSumOrderByAggregateInput
  }

  export type ServiceScalarWhereWithAggregatesInput = {
    AND?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    OR?: ServiceScalarWhereWithAggregatesInput[]
    NOT?: ServiceScalarWhereWithAggregatesInput | ServiceScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Service"> | string
    professionalId?: StringWithAggregatesFilter<"Service"> | string
    categoryId?: StringNullableWithAggregatesFilter<"Service"> | string | null
    title?: StringWithAggregatesFilter<"Service"> | string
    priceText?: StringNullableWithAggregatesFilter<"Service"> | string | null
    priceValue?: DecimalNullableWithAggregatesFilter<"Service"> | Decimal | DecimalJsLike | number | string | null
    duration?: StringNullableWithAggregatesFilter<"Service"> | string | null
    status?: EnumServiceStatusWithAggregatesFilter<"Service"> | $Enums.ServiceStatus
    createdAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Service"> | Date | string
  }

  export type OrderWhereInput = {
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    id?: StringFilter<"Order"> | string
    clientId?: StringFilter<"Order"> | string
    professionalId?: StringFilter<"Order"> | string
    serviceId?: StringNullableFilter<"Order"> | string | null
    categoryId?: StringNullableFilter<"Order"> | string | null
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    serviceType?: StringNullableFilter<"Order"> | string | null
    description?: StringNullableFilter<"Order"> | string | null
    locationCep?: StringNullableFilter<"Order"> | string | null
    address?: StringNullableFilter<"Order"> | string | null
    urgency?: StringNullableFilter<"Order"> | string | null
    attachments?: JsonNullableFilter<"Order">
    agreedPrice?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    notes?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
    service?: XOR<ServiceNullableScalarRelationFilter, ServiceWhereInput> | null
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    appointments?: AppointmentListRelationFilter
  }

  export type OrderOrderByWithRelationInput = {
    id?: SortOrder
    clientId?: SortOrder
    professionalId?: SortOrder
    serviceId?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    status?: SortOrder
    serviceType?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    locationCep?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    urgency?: SortOrderInput | SortOrder
    attachments?: SortOrderInput | SortOrder
    agreedPrice?: SortOrderInput | SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    client?: ClientOrderByWithRelationInput
    professional?: ProfessionalOrderByWithRelationInput
    service?: ServiceOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
    appointments?: AppointmentOrderByRelationAggregateInput
    _relevance?: OrderOrderByRelevanceInput
  }

  export type OrderWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: OrderWhereInput | OrderWhereInput[]
    OR?: OrderWhereInput[]
    NOT?: OrderWhereInput | OrderWhereInput[]
    clientId?: StringFilter<"Order"> | string
    professionalId?: StringFilter<"Order"> | string
    serviceId?: StringNullableFilter<"Order"> | string | null
    categoryId?: StringNullableFilter<"Order"> | string | null
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    serviceType?: StringNullableFilter<"Order"> | string | null
    description?: StringNullableFilter<"Order"> | string | null
    locationCep?: StringNullableFilter<"Order"> | string | null
    address?: StringNullableFilter<"Order"> | string | null
    urgency?: StringNullableFilter<"Order"> | string | null
    attachments?: JsonNullableFilter<"Order">
    agreedPrice?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    notes?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
    client?: XOR<ClientScalarRelationFilter, ClientWhereInput>
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
    service?: XOR<ServiceNullableScalarRelationFilter, ServiceWhereInput> | null
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
    appointments?: AppointmentListRelationFilter
  }, "id">

  export type OrderOrderByWithAggregationInput = {
    id?: SortOrder
    clientId?: SortOrder
    professionalId?: SortOrder
    serviceId?: SortOrderInput | SortOrder
    categoryId?: SortOrderInput | SortOrder
    status?: SortOrder
    serviceType?: SortOrderInput | SortOrder
    description?: SortOrderInput | SortOrder
    locationCep?: SortOrderInput | SortOrder
    address?: SortOrderInput | SortOrder
    urgency?: SortOrderInput | SortOrder
    attachments?: SortOrderInput | SortOrder
    agreedPrice?: SortOrderInput | SortOrder
    scheduledAt?: SortOrderInput | SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: OrderCountOrderByAggregateInput
    _avg?: OrderAvgOrderByAggregateInput
    _max?: OrderMaxOrderByAggregateInput
    _min?: OrderMinOrderByAggregateInput
    _sum?: OrderSumOrderByAggregateInput
  }

  export type OrderScalarWhereWithAggregatesInput = {
    AND?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    OR?: OrderScalarWhereWithAggregatesInput[]
    NOT?: OrderScalarWhereWithAggregatesInput | OrderScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Order"> | string
    clientId?: StringWithAggregatesFilter<"Order"> | string
    professionalId?: StringWithAggregatesFilter<"Order"> | string
    serviceId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    categoryId?: StringNullableWithAggregatesFilter<"Order"> | string | null
    status?: EnumOrderStatusWithAggregatesFilter<"Order"> | $Enums.OrderStatus
    serviceType?: StringNullableWithAggregatesFilter<"Order"> | string | null
    description?: StringNullableWithAggregatesFilter<"Order"> | string | null
    locationCep?: StringNullableWithAggregatesFilter<"Order"> | string | null
    address?: StringNullableWithAggregatesFilter<"Order"> | string | null
    urgency?: StringNullableWithAggregatesFilter<"Order"> | string | null
    attachments?: JsonNullableWithAggregatesFilter<"Order">
    agreedPrice?: DecimalNullableWithAggregatesFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: DateTimeNullableWithAggregatesFilter<"Order"> | Date | string | null
    notes?: StringNullableWithAggregatesFilter<"Order"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"Order"> | Date | string
  }

  export type PortfolioItemWhereInput = {
    AND?: PortfolioItemWhereInput | PortfolioItemWhereInput[]
    OR?: PortfolioItemWhereInput[]
    NOT?: PortfolioItemWhereInput | PortfolioItemWhereInput[]
    id?: StringFilter<"PortfolioItem"> | string
    professionalId?: StringFilter<"PortfolioItem"> | string
    categoryId?: StringNullableFilter<"PortfolioItem"> | string | null
    title?: StringFilter<"PortfolioItem"> | string
    imageUrl?: StringNullableFilter<"PortfolioItem"> | string | null
    year?: IntNullableFilter<"PortfolioItem"> | number | null
    createdAt?: DateTimeFilter<"PortfolioItem"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
  }

  export type PortfolioItemOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    title?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    professional?: ProfessionalOrderByWithRelationInput
    category?: CategoryOrderByWithRelationInput
    _relevance?: PortfolioItemOrderByRelevanceInput
  }

  export type PortfolioItemWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: PortfolioItemWhereInput | PortfolioItemWhereInput[]
    OR?: PortfolioItemWhereInput[]
    NOT?: PortfolioItemWhereInput | PortfolioItemWhereInput[]
    professionalId?: StringFilter<"PortfolioItem"> | string
    categoryId?: StringNullableFilter<"PortfolioItem"> | string | null
    title?: StringFilter<"PortfolioItem"> | string
    imageUrl?: StringNullableFilter<"PortfolioItem"> | string | null
    year?: IntNullableFilter<"PortfolioItem"> | number | null
    createdAt?: DateTimeFilter<"PortfolioItem"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
    category?: XOR<CategoryNullableScalarRelationFilter, CategoryWhereInput> | null
  }, "id">

  export type PortfolioItemOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    categoryId?: SortOrderInput | SortOrder
    title?: SortOrder
    imageUrl?: SortOrderInput | SortOrder
    year?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: PortfolioItemCountOrderByAggregateInput
    _avg?: PortfolioItemAvgOrderByAggregateInput
    _max?: PortfolioItemMaxOrderByAggregateInput
    _min?: PortfolioItemMinOrderByAggregateInput
    _sum?: PortfolioItemSumOrderByAggregateInput
  }

  export type PortfolioItemScalarWhereWithAggregatesInput = {
    AND?: PortfolioItemScalarWhereWithAggregatesInput | PortfolioItemScalarWhereWithAggregatesInput[]
    OR?: PortfolioItemScalarWhereWithAggregatesInput[]
    NOT?: PortfolioItemScalarWhereWithAggregatesInput | PortfolioItemScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"PortfolioItem"> | string
    professionalId?: StringWithAggregatesFilter<"PortfolioItem"> | string
    categoryId?: StringNullableWithAggregatesFilter<"PortfolioItem"> | string | null
    title?: StringWithAggregatesFilter<"PortfolioItem"> | string
    imageUrl?: StringNullableWithAggregatesFilter<"PortfolioItem"> | string | null
    year?: IntNullableWithAggregatesFilter<"PortfolioItem"> | number | null
    createdAt?: DateTimeWithAggregatesFilter<"PortfolioItem"> | Date | string
  }

  export type TestimonialWhereInput = {
    AND?: TestimonialWhereInput | TestimonialWhereInput[]
    OR?: TestimonialWhereInput[]
    NOT?: TestimonialWhereInput | TestimonialWhereInput[]
    id?: StringFilter<"Testimonial"> | string
    professionalId?: StringFilter<"Testimonial"> | string
    authorId?: StringNullableFilter<"Testimonial"> | string | null
    authorName?: StringNullableFilter<"Testimonial"> | string | null
    authorRole?: StringNullableFilter<"Testimonial"> | string | null
    content?: StringFilter<"Testimonial"> | string
    rating?: IntFilter<"Testimonial"> | number
    createdAt?: DateTimeFilter<"Testimonial"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
    author?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }

  export type TestimonialOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    authorId?: SortOrderInput | SortOrder
    authorName?: SortOrderInput | SortOrder
    authorRole?: SortOrderInput | SortOrder
    content?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    professional?: ProfessionalOrderByWithRelationInput
    author?: UserOrderByWithRelationInput
    _relevance?: TestimonialOrderByRelevanceInput
  }

  export type TestimonialWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: TestimonialWhereInput | TestimonialWhereInput[]
    OR?: TestimonialWhereInput[]
    NOT?: TestimonialWhereInput | TestimonialWhereInput[]
    professionalId?: StringFilter<"Testimonial"> | string
    authorId?: StringNullableFilter<"Testimonial"> | string | null
    authorName?: StringNullableFilter<"Testimonial"> | string | null
    authorRole?: StringNullableFilter<"Testimonial"> | string | null
    content?: StringFilter<"Testimonial"> | string
    rating?: IntFilter<"Testimonial"> | number
    createdAt?: DateTimeFilter<"Testimonial"> | Date | string
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
    author?: XOR<UserNullableScalarRelationFilter, UserWhereInput> | null
  }, "id">

  export type TestimonialOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    authorId?: SortOrderInput | SortOrder
    authorName?: SortOrderInput | SortOrder
    authorRole?: SortOrderInput | SortOrder
    content?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
    _count?: TestimonialCountOrderByAggregateInput
    _avg?: TestimonialAvgOrderByAggregateInput
    _max?: TestimonialMaxOrderByAggregateInput
    _min?: TestimonialMinOrderByAggregateInput
    _sum?: TestimonialSumOrderByAggregateInput
  }

  export type TestimonialScalarWhereWithAggregatesInput = {
    AND?: TestimonialScalarWhereWithAggregatesInput | TestimonialScalarWhereWithAggregatesInput[]
    OR?: TestimonialScalarWhereWithAggregatesInput[]
    NOT?: TestimonialScalarWhereWithAggregatesInput | TestimonialScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Testimonial"> | string
    professionalId?: StringWithAggregatesFilter<"Testimonial"> | string
    authorId?: StringNullableWithAggregatesFilter<"Testimonial"> | string | null
    authorName?: StringNullableWithAggregatesFilter<"Testimonial"> | string | null
    authorRole?: StringNullableWithAggregatesFilter<"Testimonial"> | string | null
    content?: StringWithAggregatesFilter<"Testimonial"> | string
    rating?: IntWithAggregatesFilter<"Testimonial"> | number
    createdAt?: DateTimeWithAggregatesFilter<"Testimonial"> | Date | string
  }

  export type AppointmentWhereInput = {
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    id?: StringFilter<"Appointment"> | string
    orderId?: StringNullableFilter<"Appointment"> | string | null
    professionalId?: StringFilter<"Appointment"> | string
    clientId?: StringFilter<"Appointment"> | string
    scheduledAt?: DateTimeFilter<"Appointment"> | Date | string
    address?: StringNullableFilter<"Appointment"> | string | null
    serviceName?: StringNullableFilter<"Appointment"> | string | null
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }

  export type AppointmentOrderByWithRelationInput = {
    id?: SortOrder
    orderId?: SortOrderInput | SortOrder
    professionalId?: SortOrder
    clientId?: SortOrder
    scheduledAt?: SortOrder
    address?: SortOrderInput | SortOrder
    serviceName?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    order?: OrderOrderByWithRelationInput
    professional?: ProfessionalOrderByWithRelationInput
    _relevance?: AppointmentOrderByRelevanceInput
  }

  export type AppointmentWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: AppointmentWhereInput | AppointmentWhereInput[]
    OR?: AppointmentWhereInput[]
    NOT?: AppointmentWhereInput | AppointmentWhereInput[]
    orderId?: StringNullableFilter<"Appointment"> | string | null
    professionalId?: StringFilter<"Appointment"> | string
    clientId?: StringFilter<"Appointment"> | string
    scheduledAt?: DateTimeFilter<"Appointment"> | Date | string
    address?: StringNullableFilter<"Appointment"> | string | null
    serviceName?: StringNullableFilter<"Appointment"> | string | null
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
    order?: XOR<OrderNullableScalarRelationFilter, OrderWhereInput> | null
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }, "id">

  export type AppointmentOrderByWithAggregationInput = {
    id?: SortOrder
    orderId?: SortOrderInput | SortOrder
    professionalId?: SortOrder
    clientId?: SortOrder
    scheduledAt?: SortOrder
    address?: SortOrderInput | SortOrder
    serviceName?: SortOrderInput | SortOrder
    status?: SortOrder
    notes?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    _count?: AppointmentCountOrderByAggregateInput
    _max?: AppointmentMaxOrderByAggregateInput
    _min?: AppointmentMinOrderByAggregateInput
  }

  export type AppointmentScalarWhereWithAggregatesInput = {
    AND?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    OR?: AppointmentScalarWhereWithAggregatesInput[]
    NOT?: AppointmentScalarWhereWithAggregatesInput | AppointmentScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Appointment"> | string
    orderId?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    professionalId?: StringWithAggregatesFilter<"Appointment"> | string
    clientId?: StringWithAggregatesFilter<"Appointment"> | string
    scheduledAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
    address?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    serviceName?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    status?: EnumAppointmentStatusWithAggregatesFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableWithAggregatesFilter<"Appointment"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"Appointment"> | Date | string
  }

  export type CertificationWhereInput = {
    AND?: CertificationWhereInput | CertificationWhereInput[]
    OR?: CertificationWhereInput[]
    NOT?: CertificationWhereInput | CertificationWhereInput[]
    id?: StringFilter<"Certification"> | string
    professionalId?: StringFilter<"Certification"> | string
    name?: StringFilter<"Certification"> | string
    issuedAt?: DateTimeNullableFilter<"Certification"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Certification"> | Date | string | null
    issuer?: StringNullableFilter<"Certification"> | string | null
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }

  export type CertificationOrderByWithRelationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    name?: SortOrder
    issuedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    issuer?: SortOrderInput | SortOrder
    professional?: ProfessionalOrderByWithRelationInput
    _relevance?: CertificationOrderByRelevanceInput
  }

  export type CertificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: CertificationWhereInput | CertificationWhereInput[]
    OR?: CertificationWhereInput[]
    NOT?: CertificationWhereInput | CertificationWhereInput[]
    professionalId?: StringFilter<"Certification"> | string
    name?: StringFilter<"Certification"> | string
    issuedAt?: DateTimeNullableFilter<"Certification"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Certification"> | Date | string | null
    issuer?: StringNullableFilter<"Certification"> | string | null
    professional?: XOR<ProfessionalScalarRelationFilter, ProfessionalWhereInput>
  }, "id">

  export type CertificationOrderByWithAggregationInput = {
    id?: SortOrder
    professionalId?: SortOrder
    name?: SortOrder
    issuedAt?: SortOrderInput | SortOrder
    expiresAt?: SortOrderInput | SortOrder
    issuer?: SortOrderInput | SortOrder
    _count?: CertificationCountOrderByAggregateInput
    _max?: CertificationMaxOrderByAggregateInput
    _min?: CertificationMinOrderByAggregateInput
  }

  export type CertificationScalarWhereWithAggregatesInput = {
    AND?: CertificationScalarWhereWithAggregatesInput | CertificationScalarWhereWithAggregatesInput[]
    OR?: CertificationScalarWhereWithAggregatesInput[]
    NOT?: CertificationScalarWhereWithAggregatesInput | CertificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Certification"> | string
    professionalId?: StringWithAggregatesFilter<"Certification"> | string
    name?: StringWithAggregatesFilter<"Certification"> | string
    issuedAt?: DateTimeNullableWithAggregatesFilter<"Certification"> | Date | string | null
    expiresAt?: DateTimeNullableWithAggregatesFilter<"Certification"> | Date | string | null
    issuer?: StringNullableWithAggregatesFilter<"Certification"> | string | null
  }

  export type UserCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client?: ClientCreateNestedOneWithoutUserInput
    professional?: ProfessionalCreateNestedOneWithoutUserInput
    testimonials?: TestimonialCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    name: string
    email: string
    password: string
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
    professional?: ProfessionalUncheckedCreateNestedOneWithoutUserInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneWithoutUserNestedInput
    professional?: ProfessionalUpdateOneWithoutUserNestedInput
    testimonials?: TestimonialUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
    professional?: ProfessionalUncheckedUpdateOneWithoutUserNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    name: string
    email: string
    password: string
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientCreateInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutClientInput
    orders?: OrderCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateInput = {
    id?: string
    userId: string
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClientNestedInput
    orders?: OrderUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ClientCreateManyInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type ClientUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ClientUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalCreateInput = {
    id?: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfessionalInput
    categories?: ProfessionalCategoryCreateNestedManyWithoutProfessionalInput
    services?: ServiceCreateNestedManyWithoutProfessionalInput
    orders?: OrderCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateInput = {
    id?: string
    userId: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProfessionalCategoryUncheckedCreateNestedManyWithoutProfessionalInput
    services?: ServiceUncheckedCreateNestedManyWithoutProfessionalInput
    orders?: OrderUncheckedCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfessionalNestedInput
    categories?: ProfessionalCategoryUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProfessionalCategoryUncheckedUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUncheckedUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUncheckedUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalCreateManyInput = {
    id?: string
    userId: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ProfessionalUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    professionals?: ProfessionalCategoryCreateNestedManyWithoutCategoryInput
    services?: ServiceCreateNestedManyWithoutCategoryInput
    orders?: OrderCreateNestedManyWithoutCategoryInput
    portfolio?: PortfolioItemCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    professionals?: ProfessionalCategoryUncheckedCreateNestedManyWithoutCategoryInput
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
    orders?: OrderUncheckedCreateNestedManyWithoutCategoryInput
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professionals?: ProfessionalCategoryUpdateManyWithoutCategoryNestedInput
    services?: ServiceUpdateManyWithoutCategoryNestedInput
    orders?: OrderUpdateManyWithoutCategoryNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professionals?: ProfessionalCategoryUncheckedUpdateManyWithoutCategoryNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
    orders?: OrderUncheckedUpdateManyWithoutCategoryNestedInput
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryCreateManyInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
  }

  export type CategoryUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalCategoryCreateInput = {
    professional: ProfessionalCreateNestedOneWithoutCategoriesInput
    category: CategoryCreateNestedOneWithoutProfessionalsInput
  }

  export type ProfessionalCategoryUncheckedCreateInput = {
    professionalId: string
    categoryId: string
  }

  export type ProfessionalCategoryUpdateInput = {
    professional?: ProfessionalUpdateOneRequiredWithoutCategoriesNestedInput
    category?: CategoryUpdateOneRequiredWithoutProfessionalsNestedInput
  }

  export type ProfessionalCategoryUncheckedUpdateInput = {
    professionalId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type ProfessionalCategoryCreateManyInput = {
    professionalId: string
    categoryId: string
  }

  export type ProfessionalCategoryUpdateManyMutationInput = {

  }

  export type ProfessionalCategoryUncheckedUpdateManyInput = {
    professionalId?: StringFieldUpdateOperationsInput | string
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceCreateInput = {
    id?: string
    title: string
    priceText?: string | null
    priceValue?: Decimal | DecimalJsLike | number | string | null
    duration?: string | null
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutServicesInput
    category?: CategoryCreateNestedOneWithoutServicesInput
    orders?: OrderCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateInput = {
    id?: string
    professionalId: string
    categoryId?: string | null
    title: string
    priceText?: string | null
    priceValue?: Decimal | DecimalJsLike | number | string | null
    duration?: string | null
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    priceText?: NullableStringFieldUpdateOperationsInput | string | null
    priceValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutServicesNestedInput
    category?: CategoryUpdateOneWithoutServicesNestedInput
    orders?: OrderUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    priceText?: NullableStringFieldUpdateOperationsInput | string | null
    priceValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceCreateManyInput = {
    id?: string
    professionalId: string
    categoryId?: string | null
    title: string
    priceText?: string | null
    priceValue?: Decimal | DecimalJsLike | number | string | null
    duration?: string | null
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    priceText?: NullableStringFieldUpdateOperationsInput | string | null
    priceValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ServiceUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    priceText?: NullableStringFieldUpdateOperationsInput | string | null
    priceValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateInput = {
    id?: string
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutOrdersInput
    professional: ProfessionalCreateNestedOneWithoutOrdersInput
    service?: ServiceCreateNestedOneWithoutOrdersInput
    category?: CategoryCreateNestedOneWithoutOrdersInput
    appointments?: AppointmentCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateInput = {
    id?: string
    clientId: string
    professionalId: string
    serviceId?: string | null
    categoryId?: string | null
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    professional?: ProfessionalUpdateOneRequiredWithoutOrdersNestedInput
    service?: ServiceUpdateOneWithoutOrdersNestedInput
    category?: CategoryUpdateOneWithoutOrdersNestedInput
    appointments?: AppointmentUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderCreateManyInput = {
    id?: string
    clientId: string
    professionalId: string
    serviceId?: string | null
    categoryId?: string | null
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemCreateInput = {
    id?: string
    title: string
    imageUrl?: string | null
    year?: number | null
    createdAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutPortfolioInput
    category?: CategoryCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioItemUncheckedCreateInput = {
    id?: string
    professionalId: string
    categoryId?: string | null
    title: string
    imageUrl?: string | null
    year?: number | null
    createdAt?: Date | string
  }

  export type PortfolioItemUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutPortfolioNestedInput
    category?: CategoryUpdateOneWithoutPortfolioNestedInput
  }

  export type PortfolioItemUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemCreateManyInput = {
    id?: string
    professionalId: string
    categoryId?: string | null
    title: string
    imageUrl?: string | null
    year?: number | null
    createdAt?: Date | string
  }

  export type PortfolioItemUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialCreateInput = {
    id?: string
    authorName?: string | null
    authorRole?: string | null
    content: string
    rating: number
    createdAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutTestimonialsInput
    author?: UserCreateNestedOneWithoutTestimonialsInput
  }

  export type TestimonialUncheckedCreateInput = {
    id?: string
    professionalId: string
    authorId?: string | null
    authorName?: string | null
    authorRole?: string | null
    content: string
    rating: number
    createdAt?: Date | string
  }

  export type TestimonialUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutTestimonialsNestedInput
    author?: UserUpdateOneWithoutTestimonialsNestedInput
  }

  export type TestimonialUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialCreateManyInput = {
    id?: string
    professionalId: string
    authorId?: string | null
    authorName?: string | null
    authorRole?: string | null
    content: string
    rating: number
    createdAt?: Date | string
  }

  export type TestimonialUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateInput = {
    id?: string
    clientId: string
    scheduledAt: Date | string
    address?: string | null
    serviceName?: string | null
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    order?: OrderCreateNestedOneWithoutAppointmentsInput
    professional: ProfessionalCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateInput = {
    id?: string
    orderId?: string | null
    professionalId: string
    clientId: string
    scheduledAt: Date | string
    address?: string | null
    serviceName?: string | null
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
  }

  export type AppointmentUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneWithoutAppointmentsNestedInput
    professional?: ProfessionalUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    professionalId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyInput = {
    id?: string
    orderId?: string | null
    professionalId: string
    clientId: string
    scheduledAt: Date | string
    address?: string | null
    serviceName?: string | null
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
  }

  export type AppointmentUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    professionalId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificationCreateInput = {
    id?: string
    name: string
    issuedAt?: Date | string | null
    expiresAt?: Date | string | null
    issuer?: string | null
    professional: ProfessionalCreateNestedOneWithoutCertificationsInput
  }

  export type CertificationUncheckedCreateInput = {
    id?: string
    professionalId: string
    name: string
    issuedAt?: Date | string | null
    expiresAt?: Date | string | null
    issuer?: string | null
  }

  export type CertificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
    professional?: ProfessionalUpdateOneRequiredWithoutCertificationsNestedInput
  }

  export type CertificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CertificationCreateManyInput = {
    id?: string
    professionalId: string
    name: string
    issuedAt?: Date | string | null
    expiresAt?: Date | string | null
    issuer?: string | null
  }

  export type CertificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CertificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ClientNullableScalarRelationFilter = {
    is?: ClientWhereInput | null
    isNot?: ClientWhereInput | null
  }

  export type ProfessionalNullableScalarRelationFilter = {
    is?: ProfessionalWhereInput | null
    isNot?: ProfessionalWhereInput | null
  }

  export type TestimonialListRelationFilter = {
    every?: TestimonialWhereInput
    some?: TestimonialWhereInput
    none?: TestimonialWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type TestimonialOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserOrderByRelevanceInput = {
    fields: UserOrderByRelevanceFieldEnum | UserOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    password?: SortOrder
    phone?: SortOrder
    avatarUrl?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type OrderListRelationFilter = {
    every?: OrderWhereInput
    some?: OrderWhereInput
    none?: OrderWhereInput
  }

  export type OrderOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ClientOrderByRelevanceInput = {
    fields: ClientOrderByRelevanceFieldEnum | ClientOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ClientCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type ClientMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    createdAt?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type DecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type ProfessionalCategoryListRelationFilter = {
    every?: ProfessionalCategoryWhereInput
    some?: ProfessionalCategoryWhereInput
    none?: ProfessionalCategoryWhereInput
  }

  export type ServiceListRelationFilter = {
    every?: ServiceWhereInput
    some?: ServiceWhereInput
    none?: ServiceWhereInput
  }

  export type PortfolioItemListRelationFilter = {
    every?: PortfolioItemWhereInput
    some?: PortfolioItemWhereInput
    none?: PortfolioItemWhereInput
  }

  export type AppointmentListRelationFilter = {
    every?: AppointmentWhereInput
    some?: AppointmentWhereInput
    none?: AppointmentWhereInput
  }

  export type CertificationListRelationFilter = {
    every?: CertificationWhereInput
    some?: CertificationWhereInput
    none?: CertificationWhereInput
  }

  export type ProfessionalCategoryOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ServiceOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type PortfolioItemOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type AppointmentOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type CertificationOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ProfessionalOrderByRelevanceInput = {
    fields: ProfessionalOrderByRelevanceFieldEnum | ProfessionalOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProfessionalCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    specialty?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    addressStreet?: SortOrder
    addressNumber?: SortOrder
    addressComplement?: SortOrder
    addressNeighborhood?: SortOrder
    addressCity?: SortOrder
    addressState?: SortOrder
    addressCep?: SortOrder
    cpf?: SortOrder
    isVerified?: SortOrder
    isAvailable?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalAvgOrderByAggregateInput = {
    rating?: SortOrder
    reviewCount?: SortOrder
  }

  export type ProfessionalMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    specialty?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    addressStreet?: SortOrder
    addressNumber?: SortOrder
    addressComplement?: SortOrder
    addressNeighborhood?: SortOrder
    addressCity?: SortOrder
    addressState?: SortOrder
    addressCep?: SortOrder
    cpf?: SortOrder
    isVerified?: SortOrder
    isAvailable?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    specialty?: SortOrder
    bio?: SortOrder
    phone?: SortOrder
    location?: SortOrder
    addressStreet?: SortOrder
    addressNumber?: SortOrder
    addressComplement?: SortOrder
    addressNeighborhood?: SortOrder
    addressCity?: SortOrder
    addressState?: SortOrder
    addressCep?: SortOrder
    cpf?: SortOrder
    isVerified?: SortOrder
    isAvailable?: SortOrder
    rating?: SortOrder
    reviewCount?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ProfessionalSumOrderByAggregateInput = {
    rating?: SortOrder
    reviewCount?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type DecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type CategoryOrderByRelevanceInput = {
    fields: CategoryOrderByRelevanceFieldEnum | CategoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CategoryCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type CategoryMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    slug?: SortOrder
    description?: SortOrder
    createdAt?: SortOrder
  }

  export type ProfessionalScalarRelationFilter = {
    is?: ProfessionalWhereInput
    isNot?: ProfessionalWhereInput
  }

  export type CategoryScalarRelationFilter = {
    is?: CategoryWhereInput
    isNot?: CategoryWhereInput
  }

  export type ProfessionalCategoryOrderByRelevanceInput = {
    fields: ProfessionalCategoryOrderByRelevanceFieldEnum | ProfessionalCategoryOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ProfessionalCategoryProfessionalIdCategoryIdCompoundUniqueInput = {
    professionalId: string
    categoryId: string
  }

  export type ProfessionalCategoryCountOrderByAggregateInput = {
    professionalId?: SortOrder
    categoryId?: SortOrder
  }

  export type ProfessionalCategoryMaxOrderByAggregateInput = {
    professionalId?: SortOrder
    categoryId?: SortOrder
  }

  export type ProfessionalCategoryMinOrderByAggregateInput = {
    professionalId?: SortOrder
    categoryId?: SortOrder
  }

  export type DecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type EnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[]
    notIn?: $Enums.ServiceStatus[]
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type CategoryNullableScalarRelationFilter = {
    is?: CategoryWhereInput | null
    isNot?: CategoryWhereInput | null
  }

  export type ServiceOrderByRelevanceInput = {
    fields: ServiceOrderByRelevanceFieldEnum | ServiceOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type ServiceCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    categoryId?: SortOrder
    title?: SortOrder
    priceText?: SortOrder
    priceValue?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceAvgOrderByAggregateInput = {
    priceValue?: SortOrder
  }

  export type ServiceMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    categoryId?: SortOrder
    title?: SortOrder
    priceText?: SortOrder
    priceValue?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    categoryId?: SortOrder
    title?: SortOrder
    priceText?: SortOrder
    priceValue?: SortOrder
    duration?: SortOrder
    status?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ServiceSumOrderByAggregateInput = {
    priceValue?: SortOrder
  }

  export type DecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type EnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[]
    notIn?: $Enums.ServiceStatus[]
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type EnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }
  export type JsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ClientScalarRelationFilter = {
    is?: ClientWhereInput
    isNot?: ClientWhereInput
  }

  export type ServiceNullableScalarRelationFilter = {
    is?: ServiceWhereInput | null
    isNot?: ServiceWhereInput | null
  }

  export type OrderOrderByRelevanceInput = {
    fields: OrderOrderByRelevanceFieldEnum | OrderOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type OrderCountOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    professionalId?: SortOrder
    serviceId?: SortOrder
    categoryId?: SortOrder
    status?: SortOrder
    serviceType?: SortOrder
    description?: SortOrder
    locationCep?: SortOrder
    address?: SortOrder
    urgency?: SortOrder
    attachments?: SortOrder
    agreedPrice?: SortOrder
    scheduledAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderAvgOrderByAggregateInput = {
    agreedPrice?: SortOrder
  }

  export type OrderMaxOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    professionalId?: SortOrder
    serviceId?: SortOrder
    categoryId?: SortOrder
    status?: SortOrder
    serviceType?: SortOrder
    description?: SortOrder
    locationCep?: SortOrder
    address?: SortOrder
    urgency?: SortOrder
    agreedPrice?: SortOrder
    scheduledAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderMinOrderByAggregateInput = {
    id?: SortOrder
    clientId?: SortOrder
    professionalId?: SortOrder
    serviceId?: SortOrder
    categoryId?: SortOrder
    status?: SortOrder
    serviceType?: SortOrder
    description?: SortOrder
    locationCep?: SortOrder
    address?: SortOrder
    urgency?: SortOrder
    agreedPrice?: SortOrder
    scheduledAt?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type OrderSumOrderByAggregateInput = {
    agreedPrice?: SortOrder
  }

  export type EnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }
  export type JsonNullableWithAggregatesFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, Exclude<keyof Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>,
        Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<JsonNullableWithAggregatesFilterBase<$PrismaModel>>, 'path'>>

  export type JsonNullableWithAggregatesFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedJsonNullableFilter<$PrismaModel>
    _max?: NestedJsonNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type PortfolioItemOrderByRelevanceInput = {
    fields: PortfolioItemOrderByRelevanceFieldEnum | PortfolioItemOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type PortfolioItemCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    categoryId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    year?: SortOrder
    createdAt?: SortOrder
  }

  export type PortfolioItemAvgOrderByAggregateInput = {
    year?: SortOrder
  }

  export type PortfolioItemMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    categoryId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    year?: SortOrder
    createdAt?: SortOrder
  }

  export type PortfolioItemMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    categoryId?: SortOrder
    title?: SortOrder
    imageUrl?: SortOrder
    year?: SortOrder
    createdAt?: SortOrder
  }

  export type PortfolioItemSumOrderByAggregateInput = {
    year?: SortOrder
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type UserNullableScalarRelationFilter = {
    is?: UserWhereInput | null
    isNot?: UserWhereInput | null
  }

  export type TestimonialOrderByRelevanceInput = {
    fields: TestimonialOrderByRelevanceFieldEnum | TestimonialOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type TestimonialCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrder
    authorRole?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
  }

  export type TestimonialAvgOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type TestimonialMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrder
    authorRole?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
  }

  export type TestimonialMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    authorId?: SortOrder
    authorName?: SortOrder
    authorRole?: SortOrder
    content?: SortOrder
    rating?: SortOrder
    createdAt?: SortOrder
  }

  export type TestimonialSumOrderByAggregateInput = {
    rating?: SortOrder
  }

  export type EnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[]
    notIn?: $Enums.AppointmentStatus[]
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type OrderNullableScalarRelationFilter = {
    is?: OrderWhereInput | null
    isNot?: OrderWhereInput | null
  }

  export type AppointmentOrderByRelevanceInput = {
    fields: AppointmentOrderByRelevanceFieldEnum | AppointmentOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type AppointmentCountOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    professionalId?: SortOrder
    clientId?: SortOrder
    scheduledAt?: SortOrder
    address?: SortOrder
    serviceName?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type AppointmentMaxOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    professionalId?: SortOrder
    clientId?: SortOrder
    scheduledAt?: SortOrder
    address?: SortOrder
    serviceName?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type AppointmentMinOrderByAggregateInput = {
    id?: SortOrder
    orderId?: SortOrder
    professionalId?: SortOrder
    clientId?: SortOrder
    scheduledAt?: SortOrder
    address?: SortOrder
    serviceName?: SortOrder
    status?: SortOrder
    notes?: SortOrder
    createdAt?: SortOrder
  }

  export type EnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[]
    notIn?: $Enums.AppointmentStatus[]
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type CertificationOrderByRelevanceInput = {
    fields: CertificationOrderByRelevanceFieldEnum | CertificationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type CertificationCountOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    name?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    issuer?: SortOrder
  }

  export type CertificationMaxOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    name?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    issuer?: SortOrder
  }

  export type CertificationMinOrderByAggregateInput = {
    id?: SortOrder
    professionalId?: SortOrder
    name?: SortOrder
    issuedAt?: SortOrder
    expiresAt?: SortOrder
    issuer?: SortOrder
  }

  export type ClientCreateNestedOneWithoutUserInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput
    connect?: ClientWhereUniqueInput
  }

  export type ProfessionalCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfessionalCreateWithoutUserInput, ProfessionalUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutUserInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type TestimonialCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TestimonialCreateWithoutAuthorInput, TestimonialUncheckedCreateWithoutAuthorInput> | TestimonialCreateWithoutAuthorInput[] | TestimonialUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutAuthorInput | TestimonialCreateOrConnectWithoutAuthorInput[]
    createMany?: TestimonialCreateManyAuthorInputEnvelope
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
  }

  export type ClientUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput
    connect?: ClientWhereUniqueInput
  }

  export type ProfessionalUncheckedCreateNestedOneWithoutUserInput = {
    create?: XOR<ProfessionalCreateWithoutUserInput, ProfessionalUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutUserInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type TestimonialUncheckedCreateNestedManyWithoutAuthorInput = {
    create?: XOR<TestimonialCreateWithoutAuthorInput, TestimonialUncheckedCreateWithoutAuthorInput> | TestimonialCreateWithoutAuthorInput[] | TestimonialUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutAuthorInput | TestimonialCreateOrConnectWithoutAuthorInput[]
    createMany?: TestimonialCreateManyAuthorInputEnvelope
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type ClientUpdateOneWithoutUserNestedInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput
    upsert?: ClientUpsertWithoutUserInput
    disconnect?: ClientWhereInput | boolean
    delete?: ClientWhereInput | boolean
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutUserInput, ClientUpdateWithoutUserInput>, ClientUncheckedUpdateWithoutUserInput>
  }

  export type ProfessionalUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfessionalCreateWithoutUserInput, ProfessionalUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutUserInput
    upsert?: ProfessionalUpsertWithoutUserInput
    disconnect?: ProfessionalWhereInput | boolean
    delete?: ProfessionalWhereInput | boolean
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutUserInput, ProfessionalUpdateWithoutUserInput>, ProfessionalUncheckedUpdateWithoutUserInput>
  }

  export type TestimonialUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TestimonialCreateWithoutAuthorInput, TestimonialUncheckedCreateWithoutAuthorInput> | TestimonialCreateWithoutAuthorInput[] | TestimonialUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutAuthorInput | TestimonialCreateOrConnectWithoutAuthorInput[]
    upsert?: TestimonialUpsertWithWhereUniqueWithoutAuthorInput | TestimonialUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TestimonialCreateManyAuthorInputEnvelope
    set?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    disconnect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    delete?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    update?: TestimonialUpdateWithWhereUniqueWithoutAuthorInput | TestimonialUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TestimonialUpdateManyWithWhereWithoutAuthorInput | TestimonialUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
  }

  export type ClientUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    connectOrCreate?: ClientCreateOrConnectWithoutUserInput
    upsert?: ClientUpsertWithoutUserInput
    disconnect?: ClientWhereInput | boolean
    delete?: ClientWhereInput | boolean
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutUserInput, ClientUpdateWithoutUserInput>, ClientUncheckedUpdateWithoutUserInput>
  }

  export type ProfessionalUncheckedUpdateOneWithoutUserNestedInput = {
    create?: XOR<ProfessionalCreateWithoutUserInput, ProfessionalUncheckedCreateWithoutUserInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutUserInput
    upsert?: ProfessionalUpsertWithoutUserInput
    disconnect?: ProfessionalWhereInput | boolean
    delete?: ProfessionalWhereInput | boolean
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutUserInput, ProfessionalUpdateWithoutUserInput>, ProfessionalUncheckedUpdateWithoutUserInput>
  }

  export type TestimonialUncheckedUpdateManyWithoutAuthorNestedInput = {
    create?: XOR<TestimonialCreateWithoutAuthorInput, TestimonialUncheckedCreateWithoutAuthorInput> | TestimonialCreateWithoutAuthorInput[] | TestimonialUncheckedCreateWithoutAuthorInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutAuthorInput | TestimonialCreateOrConnectWithoutAuthorInput[]
    upsert?: TestimonialUpsertWithWhereUniqueWithoutAuthorInput | TestimonialUpsertWithWhereUniqueWithoutAuthorInput[]
    createMany?: TestimonialCreateManyAuthorInputEnvelope
    set?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    disconnect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    delete?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    update?: TestimonialUpdateWithWhereUniqueWithoutAuthorInput | TestimonialUpdateWithWhereUniqueWithoutAuthorInput[]
    updateMany?: TestimonialUpdateManyWithWhereWithoutAuthorInput | TestimonialUpdateManyWithWhereWithoutAuthorInput[]
    deleteMany?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutClientInput = {
    create?: XOR<UserCreateWithoutClientInput, UserUncheckedCreateWithoutClientInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientInput
    connect?: UserWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutClientInput = {
    create?: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput> | OrderCreateWithoutClientInput[] | OrderUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClientInput | OrderCreateOrConnectWithoutClientInput[]
    createMany?: OrderCreateManyClientInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutClientInput = {
    create?: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput> | OrderCreateWithoutClientInput[] | OrderUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClientInput | OrderCreateOrConnectWithoutClientInput[]
    createMany?: OrderCreateManyClientInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type UserUpdateOneRequiredWithoutClientNestedInput = {
    create?: XOR<UserCreateWithoutClientInput, UserUncheckedCreateWithoutClientInput>
    connectOrCreate?: UserCreateOrConnectWithoutClientInput
    upsert?: UserUpsertWithoutClientInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutClientInput, UserUpdateWithoutClientInput>, UserUncheckedUpdateWithoutClientInput>
  }

  export type OrderUpdateManyWithoutClientNestedInput = {
    create?: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput> | OrderCreateWithoutClientInput[] | OrderUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClientInput | OrderCreateOrConnectWithoutClientInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutClientInput | OrderUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OrderCreateManyClientInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutClientInput | OrderUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutClientInput | OrderUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutClientNestedInput = {
    create?: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput> | OrderCreateWithoutClientInput[] | OrderUncheckedCreateWithoutClientInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutClientInput | OrderCreateOrConnectWithoutClientInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutClientInput | OrderUpsertWithWhereUniqueWithoutClientInput[]
    createMany?: OrderCreateManyClientInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutClientInput | OrderUpdateWithWhereUniqueWithoutClientInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutClientInput | OrderUpdateManyWithWhereWithoutClientInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutProfessionalInput = {
    create?: XOR<UserCreateWithoutProfessionalInput, UserUncheckedCreateWithoutProfessionalInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessionalInput
    connect?: UserWhereUniqueInput
  }

  export type ProfessionalCategoryCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalCategoryCreateWithoutProfessionalInput, ProfessionalCategoryUncheckedCreateWithoutProfessionalInput> | ProfessionalCategoryCreateWithoutProfessionalInput[] | ProfessionalCategoryUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalCategoryCreateOrConnectWithoutProfessionalInput | ProfessionalCategoryCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalCategoryCreateManyProfessionalInputEnvelope
    connect?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ServiceCreateWithoutProfessionalInput, ServiceUncheckedCreateWithoutProfessionalInput> | ServiceCreateWithoutProfessionalInput[] | ServiceUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutProfessionalInput | ServiceCreateOrConnectWithoutProfessionalInput[]
    createMany?: ServiceCreateManyProfessionalInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<OrderCreateWithoutProfessionalInput, OrderUncheckedCreateWithoutProfessionalInput> | OrderCreateWithoutProfessionalInput[] | OrderUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutProfessionalInput | OrderCreateOrConnectWithoutProfessionalInput[]
    createMany?: OrderCreateManyProfessionalInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PortfolioItemCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<PortfolioItemCreateWithoutProfessionalInput, PortfolioItemUncheckedCreateWithoutProfessionalInput> | PortfolioItemCreateWithoutProfessionalInput[] | PortfolioItemUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: PortfolioItemCreateOrConnectWithoutProfessionalInput | PortfolioItemCreateOrConnectWithoutProfessionalInput[]
    createMany?: PortfolioItemCreateManyProfessionalInputEnvelope
    connect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
  }

  export type TestimonialCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<TestimonialCreateWithoutProfessionalInput, TestimonialUncheckedCreateWithoutProfessionalInput> | TestimonialCreateWithoutProfessionalInput[] | TestimonialUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutProfessionalInput | TestimonialCreateOrConnectWithoutProfessionalInput[]
    createMany?: TestimonialCreateManyProfessionalInputEnvelope
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
  }

  export type AppointmentCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<AppointmentCreateWithoutProfessionalInput, AppointmentUncheckedCreateWithoutProfessionalInput> | AppointmentCreateWithoutProfessionalInput[] | AppointmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutProfessionalInput | AppointmentCreateOrConnectWithoutProfessionalInput[]
    createMany?: AppointmentCreateManyProfessionalInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type CertificationCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<CertificationCreateWithoutProfessionalInput, CertificationUncheckedCreateWithoutProfessionalInput> | CertificationCreateWithoutProfessionalInput[] | CertificationUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: CertificationCreateOrConnectWithoutProfessionalInput | CertificationCreateOrConnectWithoutProfessionalInput[]
    createMany?: CertificationCreateManyProfessionalInputEnvelope
    connect?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
  }

  export type ProfessionalCategoryUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ProfessionalCategoryCreateWithoutProfessionalInput, ProfessionalCategoryUncheckedCreateWithoutProfessionalInput> | ProfessionalCategoryCreateWithoutProfessionalInput[] | ProfessionalCategoryUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalCategoryCreateOrConnectWithoutProfessionalInput | ProfessionalCategoryCreateOrConnectWithoutProfessionalInput[]
    createMany?: ProfessionalCategoryCreateManyProfessionalInputEnvelope
    connect?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<ServiceCreateWithoutProfessionalInput, ServiceUncheckedCreateWithoutProfessionalInput> | ServiceCreateWithoutProfessionalInput[] | ServiceUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutProfessionalInput | ServiceCreateOrConnectWithoutProfessionalInput[]
    createMany?: ServiceCreateManyProfessionalInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<OrderCreateWithoutProfessionalInput, OrderUncheckedCreateWithoutProfessionalInput> | OrderCreateWithoutProfessionalInput[] | OrderUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutProfessionalInput | OrderCreateOrConnectWithoutProfessionalInput[]
    createMany?: OrderCreateManyProfessionalInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PortfolioItemUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<PortfolioItemCreateWithoutProfessionalInput, PortfolioItemUncheckedCreateWithoutProfessionalInput> | PortfolioItemCreateWithoutProfessionalInput[] | PortfolioItemUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: PortfolioItemCreateOrConnectWithoutProfessionalInput | PortfolioItemCreateOrConnectWithoutProfessionalInput[]
    createMany?: PortfolioItemCreateManyProfessionalInputEnvelope
    connect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
  }

  export type TestimonialUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<TestimonialCreateWithoutProfessionalInput, TestimonialUncheckedCreateWithoutProfessionalInput> | TestimonialCreateWithoutProfessionalInput[] | TestimonialUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutProfessionalInput | TestimonialCreateOrConnectWithoutProfessionalInput[]
    createMany?: TestimonialCreateManyProfessionalInputEnvelope
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<AppointmentCreateWithoutProfessionalInput, AppointmentUncheckedCreateWithoutProfessionalInput> | AppointmentCreateWithoutProfessionalInput[] | AppointmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutProfessionalInput | AppointmentCreateOrConnectWithoutProfessionalInput[]
    createMany?: AppointmentCreateManyProfessionalInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type CertificationUncheckedCreateNestedManyWithoutProfessionalInput = {
    create?: XOR<CertificationCreateWithoutProfessionalInput, CertificationUncheckedCreateWithoutProfessionalInput> | CertificationCreateWithoutProfessionalInput[] | CertificationUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: CertificationCreateOrConnectWithoutProfessionalInput | CertificationCreateOrConnectWithoutProfessionalInput[]
    createMany?: CertificationCreateManyProfessionalInputEnvelope
    connect?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type DecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type UserUpdateOneRequiredWithoutProfessionalNestedInput = {
    create?: XOR<UserCreateWithoutProfessionalInput, UserUncheckedCreateWithoutProfessionalInput>
    connectOrCreate?: UserCreateOrConnectWithoutProfessionalInput
    upsert?: UserUpsertWithoutProfessionalInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutProfessionalInput, UserUpdateWithoutProfessionalInput>, UserUncheckedUpdateWithoutProfessionalInput>
  }

  export type ProfessionalCategoryUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalCategoryCreateWithoutProfessionalInput, ProfessionalCategoryUncheckedCreateWithoutProfessionalInput> | ProfessionalCategoryCreateWithoutProfessionalInput[] | ProfessionalCategoryUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalCategoryCreateOrConnectWithoutProfessionalInput | ProfessionalCategoryCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalCategoryUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalCategoryUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalCategoryCreateManyProfessionalInputEnvelope
    set?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    disconnect?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    delete?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    connect?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    update?: ProfessionalCategoryUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalCategoryUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalCategoryUpdateManyWithWhereWithoutProfessionalInput | ProfessionalCategoryUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalCategoryScalarWhereInput | ProfessionalCategoryScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ServiceCreateWithoutProfessionalInput, ServiceUncheckedCreateWithoutProfessionalInput> | ServiceCreateWithoutProfessionalInput[] | ServiceUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutProfessionalInput | ServiceCreateOrConnectWithoutProfessionalInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutProfessionalInput | ServiceUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ServiceCreateManyProfessionalInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutProfessionalInput | ServiceUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutProfessionalInput | ServiceUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<OrderCreateWithoutProfessionalInput, OrderUncheckedCreateWithoutProfessionalInput> | OrderCreateWithoutProfessionalInput[] | OrderUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutProfessionalInput | OrderCreateOrConnectWithoutProfessionalInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutProfessionalInput | OrderUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: OrderCreateManyProfessionalInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutProfessionalInput | OrderUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutProfessionalInput | OrderUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PortfolioItemUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<PortfolioItemCreateWithoutProfessionalInput, PortfolioItemUncheckedCreateWithoutProfessionalInput> | PortfolioItemCreateWithoutProfessionalInput[] | PortfolioItemUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: PortfolioItemCreateOrConnectWithoutProfessionalInput | PortfolioItemCreateOrConnectWithoutProfessionalInput[]
    upsert?: PortfolioItemUpsertWithWhereUniqueWithoutProfessionalInput | PortfolioItemUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: PortfolioItemCreateManyProfessionalInputEnvelope
    set?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    disconnect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    delete?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    connect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    update?: PortfolioItemUpdateWithWhereUniqueWithoutProfessionalInput | PortfolioItemUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: PortfolioItemUpdateManyWithWhereWithoutProfessionalInput | PortfolioItemUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: PortfolioItemScalarWhereInput | PortfolioItemScalarWhereInput[]
  }

  export type TestimonialUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<TestimonialCreateWithoutProfessionalInput, TestimonialUncheckedCreateWithoutProfessionalInput> | TestimonialCreateWithoutProfessionalInput[] | TestimonialUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutProfessionalInput | TestimonialCreateOrConnectWithoutProfessionalInput[]
    upsert?: TestimonialUpsertWithWhereUniqueWithoutProfessionalInput | TestimonialUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: TestimonialCreateManyProfessionalInputEnvelope
    set?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    disconnect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    delete?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    update?: TestimonialUpdateWithWhereUniqueWithoutProfessionalInput | TestimonialUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: TestimonialUpdateManyWithWhereWithoutProfessionalInput | TestimonialUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
  }

  export type AppointmentUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<AppointmentCreateWithoutProfessionalInput, AppointmentUncheckedCreateWithoutProfessionalInput> | AppointmentCreateWithoutProfessionalInput[] | AppointmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutProfessionalInput | AppointmentCreateOrConnectWithoutProfessionalInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutProfessionalInput | AppointmentUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: AppointmentCreateManyProfessionalInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutProfessionalInput | AppointmentUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutProfessionalInput | AppointmentUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type CertificationUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<CertificationCreateWithoutProfessionalInput, CertificationUncheckedCreateWithoutProfessionalInput> | CertificationCreateWithoutProfessionalInput[] | CertificationUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: CertificationCreateOrConnectWithoutProfessionalInput | CertificationCreateOrConnectWithoutProfessionalInput[]
    upsert?: CertificationUpsertWithWhereUniqueWithoutProfessionalInput | CertificationUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: CertificationCreateManyProfessionalInputEnvelope
    set?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    disconnect?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    delete?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    connect?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    update?: CertificationUpdateWithWhereUniqueWithoutProfessionalInput | CertificationUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: CertificationUpdateManyWithWhereWithoutProfessionalInput | CertificationUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: CertificationScalarWhereInput | CertificationScalarWhereInput[]
  }

  export type ProfessionalCategoryUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ProfessionalCategoryCreateWithoutProfessionalInput, ProfessionalCategoryUncheckedCreateWithoutProfessionalInput> | ProfessionalCategoryCreateWithoutProfessionalInput[] | ProfessionalCategoryUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ProfessionalCategoryCreateOrConnectWithoutProfessionalInput | ProfessionalCategoryCreateOrConnectWithoutProfessionalInput[]
    upsert?: ProfessionalCategoryUpsertWithWhereUniqueWithoutProfessionalInput | ProfessionalCategoryUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ProfessionalCategoryCreateManyProfessionalInputEnvelope
    set?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    disconnect?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    delete?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    connect?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    update?: ProfessionalCategoryUpdateWithWhereUniqueWithoutProfessionalInput | ProfessionalCategoryUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ProfessionalCategoryUpdateManyWithWhereWithoutProfessionalInput | ProfessionalCategoryUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ProfessionalCategoryScalarWhereInput | ProfessionalCategoryScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<ServiceCreateWithoutProfessionalInput, ServiceUncheckedCreateWithoutProfessionalInput> | ServiceCreateWithoutProfessionalInput[] | ServiceUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutProfessionalInput | ServiceCreateOrConnectWithoutProfessionalInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutProfessionalInput | ServiceUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: ServiceCreateManyProfessionalInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutProfessionalInput | ServiceUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutProfessionalInput | ServiceUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<OrderCreateWithoutProfessionalInput, OrderUncheckedCreateWithoutProfessionalInput> | OrderCreateWithoutProfessionalInput[] | OrderUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutProfessionalInput | OrderCreateOrConnectWithoutProfessionalInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutProfessionalInput | OrderUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: OrderCreateManyProfessionalInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutProfessionalInput | OrderUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutProfessionalInput | OrderUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PortfolioItemUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<PortfolioItemCreateWithoutProfessionalInput, PortfolioItemUncheckedCreateWithoutProfessionalInput> | PortfolioItemCreateWithoutProfessionalInput[] | PortfolioItemUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: PortfolioItemCreateOrConnectWithoutProfessionalInput | PortfolioItemCreateOrConnectWithoutProfessionalInput[]
    upsert?: PortfolioItemUpsertWithWhereUniqueWithoutProfessionalInput | PortfolioItemUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: PortfolioItemCreateManyProfessionalInputEnvelope
    set?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    disconnect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    delete?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    connect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    update?: PortfolioItemUpdateWithWhereUniqueWithoutProfessionalInput | PortfolioItemUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: PortfolioItemUpdateManyWithWhereWithoutProfessionalInput | PortfolioItemUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: PortfolioItemScalarWhereInput | PortfolioItemScalarWhereInput[]
  }

  export type TestimonialUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<TestimonialCreateWithoutProfessionalInput, TestimonialUncheckedCreateWithoutProfessionalInput> | TestimonialCreateWithoutProfessionalInput[] | TestimonialUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: TestimonialCreateOrConnectWithoutProfessionalInput | TestimonialCreateOrConnectWithoutProfessionalInput[]
    upsert?: TestimonialUpsertWithWhereUniqueWithoutProfessionalInput | TestimonialUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: TestimonialCreateManyProfessionalInputEnvelope
    set?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    disconnect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    delete?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    connect?: TestimonialWhereUniqueInput | TestimonialWhereUniqueInput[]
    update?: TestimonialUpdateWithWhereUniqueWithoutProfessionalInput | TestimonialUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: TestimonialUpdateManyWithWhereWithoutProfessionalInput | TestimonialUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<AppointmentCreateWithoutProfessionalInput, AppointmentUncheckedCreateWithoutProfessionalInput> | AppointmentCreateWithoutProfessionalInput[] | AppointmentUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutProfessionalInput | AppointmentCreateOrConnectWithoutProfessionalInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutProfessionalInput | AppointmentUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: AppointmentCreateManyProfessionalInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutProfessionalInput | AppointmentUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutProfessionalInput | AppointmentUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type CertificationUncheckedUpdateManyWithoutProfessionalNestedInput = {
    create?: XOR<CertificationCreateWithoutProfessionalInput, CertificationUncheckedCreateWithoutProfessionalInput> | CertificationCreateWithoutProfessionalInput[] | CertificationUncheckedCreateWithoutProfessionalInput[]
    connectOrCreate?: CertificationCreateOrConnectWithoutProfessionalInput | CertificationCreateOrConnectWithoutProfessionalInput[]
    upsert?: CertificationUpsertWithWhereUniqueWithoutProfessionalInput | CertificationUpsertWithWhereUniqueWithoutProfessionalInput[]
    createMany?: CertificationCreateManyProfessionalInputEnvelope
    set?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    disconnect?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    delete?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    connect?: CertificationWhereUniqueInput | CertificationWhereUniqueInput[]
    update?: CertificationUpdateWithWhereUniqueWithoutProfessionalInput | CertificationUpdateWithWhereUniqueWithoutProfessionalInput[]
    updateMany?: CertificationUpdateManyWithWhereWithoutProfessionalInput | CertificationUpdateManyWithWhereWithoutProfessionalInput[]
    deleteMany?: CertificationScalarWhereInput | CertificationScalarWhereInput[]
  }

  export type ProfessionalCategoryCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProfessionalCategoryCreateWithoutCategoryInput, ProfessionalCategoryUncheckedCreateWithoutCategoryInput> | ProfessionalCategoryCreateWithoutCategoryInput[] | ProfessionalCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProfessionalCategoryCreateOrConnectWithoutCategoryInput | ProfessionalCategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: ProfessionalCategoryCreateManyCategoryInputEnvelope
    connect?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
  }

  export type ServiceCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type OrderCreateNestedManyWithoutCategoryInput = {
    create?: XOR<OrderCreateWithoutCategoryInput, OrderUncheckedCreateWithoutCategoryInput> | OrderCreateWithoutCategoryInput[] | OrderUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCategoryInput | OrderCreateOrConnectWithoutCategoryInput[]
    createMany?: OrderCreateManyCategoryInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PortfolioItemCreateNestedManyWithoutCategoryInput = {
    create?: XOR<PortfolioItemCreateWithoutCategoryInput, PortfolioItemUncheckedCreateWithoutCategoryInput> | PortfolioItemCreateWithoutCategoryInput[] | PortfolioItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PortfolioItemCreateOrConnectWithoutCategoryInput | PortfolioItemCreateOrConnectWithoutCategoryInput[]
    createMany?: PortfolioItemCreateManyCategoryInputEnvelope
    connect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
  }

  export type ProfessionalCategoryUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ProfessionalCategoryCreateWithoutCategoryInput, ProfessionalCategoryUncheckedCreateWithoutCategoryInput> | ProfessionalCategoryCreateWithoutCategoryInput[] | ProfessionalCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProfessionalCategoryCreateOrConnectWithoutCategoryInput | ProfessionalCategoryCreateOrConnectWithoutCategoryInput[]
    createMany?: ProfessionalCategoryCreateManyCategoryInputEnvelope
    connect?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
  }

  export type ServiceUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<OrderCreateWithoutCategoryInput, OrderUncheckedCreateWithoutCategoryInput> | OrderCreateWithoutCategoryInput[] | OrderUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCategoryInput | OrderCreateOrConnectWithoutCategoryInput[]
    createMany?: OrderCreateManyCategoryInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type PortfolioItemUncheckedCreateNestedManyWithoutCategoryInput = {
    create?: XOR<PortfolioItemCreateWithoutCategoryInput, PortfolioItemUncheckedCreateWithoutCategoryInput> | PortfolioItemCreateWithoutCategoryInput[] | PortfolioItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PortfolioItemCreateOrConnectWithoutCategoryInput | PortfolioItemCreateOrConnectWithoutCategoryInput[]
    createMany?: PortfolioItemCreateManyCategoryInputEnvelope
    connect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
  }

  export type ProfessionalCategoryUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProfessionalCategoryCreateWithoutCategoryInput, ProfessionalCategoryUncheckedCreateWithoutCategoryInput> | ProfessionalCategoryCreateWithoutCategoryInput[] | ProfessionalCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProfessionalCategoryCreateOrConnectWithoutCategoryInput | ProfessionalCategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: ProfessionalCategoryUpsertWithWhereUniqueWithoutCategoryInput | ProfessionalCategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProfessionalCategoryCreateManyCategoryInputEnvelope
    set?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    disconnect?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    delete?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    connect?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    update?: ProfessionalCategoryUpdateWithWhereUniqueWithoutCategoryInput | ProfessionalCategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProfessionalCategoryUpdateManyWithWhereWithoutCategoryInput | ProfessionalCategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProfessionalCategoryScalarWhereInput | ProfessionalCategoryScalarWhereInput[]
  }

  export type ServiceUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCategoryInput | ServiceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCategoryInput | ServiceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCategoryInput | ServiceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type OrderUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<OrderCreateWithoutCategoryInput, OrderUncheckedCreateWithoutCategoryInput> | OrderCreateWithoutCategoryInput[] | OrderUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCategoryInput | OrderCreateOrConnectWithoutCategoryInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutCategoryInput | OrderUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: OrderCreateManyCategoryInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutCategoryInput | OrderUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutCategoryInput | OrderUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PortfolioItemUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<PortfolioItemCreateWithoutCategoryInput, PortfolioItemUncheckedCreateWithoutCategoryInput> | PortfolioItemCreateWithoutCategoryInput[] | PortfolioItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PortfolioItemCreateOrConnectWithoutCategoryInput | PortfolioItemCreateOrConnectWithoutCategoryInput[]
    upsert?: PortfolioItemUpsertWithWhereUniqueWithoutCategoryInput | PortfolioItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: PortfolioItemCreateManyCategoryInputEnvelope
    set?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    disconnect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    delete?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    connect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    update?: PortfolioItemUpdateWithWhereUniqueWithoutCategoryInput | PortfolioItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: PortfolioItemUpdateManyWithWhereWithoutCategoryInput | PortfolioItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: PortfolioItemScalarWhereInput | PortfolioItemScalarWhereInput[]
  }

  export type ProfessionalCategoryUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ProfessionalCategoryCreateWithoutCategoryInput, ProfessionalCategoryUncheckedCreateWithoutCategoryInput> | ProfessionalCategoryCreateWithoutCategoryInput[] | ProfessionalCategoryUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ProfessionalCategoryCreateOrConnectWithoutCategoryInput | ProfessionalCategoryCreateOrConnectWithoutCategoryInput[]
    upsert?: ProfessionalCategoryUpsertWithWhereUniqueWithoutCategoryInput | ProfessionalCategoryUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ProfessionalCategoryCreateManyCategoryInputEnvelope
    set?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    disconnect?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    delete?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    connect?: ProfessionalCategoryWhereUniqueInput | ProfessionalCategoryWhereUniqueInput[]
    update?: ProfessionalCategoryUpdateWithWhereUniqueWithoutCategoryInput | ProfessionalCategoryUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ProfessionalCategoryUpdateManyWithWhereWithoutCategoryInput | ProfessionalCategoryUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ProfessionalCategoryScalarWhereInput | ProfessionalCategoryScalarWhereInput[]
  }

  export type ServiceUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput> | ServiceCreateWithoutCategoryInput[] | ServiceUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: ServiceCreateOrConnectWithoutCategoryInput | ServiceCreateOrConnectWithoutCategoryInput[]
    upsert?: ServiceUpsertWithWhereUniqueWithoutCategoryInput | ServiceUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: ServiceCreateManyCategoryInputEnvelope
    set?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    disconnect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    delete?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    connect?: ServiceWhereUniqueInput | ServiceWhereUniqueInput[]
    update?: ServiceUpdateWithWhereUniqueWithoutCategoryInput | ServiceUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: ServiceUpdateManyWithWhereWithoutCategoryInput | ServiceUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<OrderCreateWithoutCategoryInput, OrderUncheckedCreateWithoutCategoryInput> | OrderCreateWithoutCategoryInput[] | OrderUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutCategoryInput | OrderCreateOrConnectWithoutCategoryInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutCategoryInput | OrderUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: OrderCreateManyCategoryInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutCategoryInput | OrderUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutCategoryInput | OrderUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type PortfolioItemUncheckedUpdateManyWithoutCategoryNestedInput = {
    create?: XOR<PortfolioItemCreateWithoutCategoryInput, PortfolioItemUncheckedCreateWithoutCategoryInput> | PortfolioItemCreateWithoutCategoryInput[] | PortfolioItemUncheckedCreateWithoutCategoryInput[]
    connectOrCreate?: PortfolioItemCreateOrConnectWithoutCategoryInput | PortfolioItemCreateOrConnectWithoutCategoryInput[]
    upsert?: PortfolioItemUpsertWithWhereUniqueWithoutCategoryInput | PortfolioItemUpsertWithWhereUniqueWithoutCategoryInput[]
    createMany?: PortfolioItemCreateManyCategoryInputEnvelope
    set?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    disconnect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    delete?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    connect?: PortfolioItemWhereUniqueInput | PortfolioItemWhereUniqueInput[]
    update?: PortfolioItemUpdateWithWhereUniqueWithoutCategoryInput | PortfolioItemUpdateWithWhereUniqueWithoutCategoryInput[]
    updateMany?: PortfolioItemUpdateManyWithWhereWithoutCategoryInput | PortfolioItemUpdateManyWithWhereWithoutCategoryInput[]
    deleteMany?: PortfolioItemScalarWhereInput | PortfolioItemScalarWhereInput[]
  }

  export type ProfessionalCreateNestedOneWithoutCategoriesInput = {
    create?: XOR<ProfessionalCreateWithoutCategoriesInput, ProfessionalUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutCategoriesInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutProfessionalsInput = {
    create?: XOR<CategoryCreateWithoutProfessionalsInput, CategoryUncheckedCreateWithoutProfessionalsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProfessionalsInput
    connect?: CategoryWhereUniqueInput
  }

  export type ProfessionalUpdateOneRequiredWithoutCategoriesNestedInput = {
    create?: XOR<ProfessionalCreateWithoutCategoriesInput, ProfessionalUncheckedCreateWithoutCategoriesInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutCategoriesInput
    upsert?: ProfessionalUpsertWithoutCategoriesInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutCategoriesInput, ProfessionalUpdateWithoutCategoriesInput>, ProfessionalUncheckedUpdateWithoutCategoriesInput>
  }

  export type CategoryUpdateOneRequiredWithoutProfessionalsNestedInput = {
    create?: XOR<CategoryCreateWithoutProfessionalsInput, CategoryUncheckedCreateWithoutProfessionalsInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutProfessionalsInput
    upsert?: CategoryUpsertWithoutProfessionalsInput
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutProfessionalsInput, CategoryUpdateWithoutProfessionalsInput>, CategoryUncheckedUpdateWithoutProfessionalsInput>
  }

  export type ProfessionalCreateNestedOneWithoutServicesInput = {
    create?: XOR<ProfessionalCreateWithoutServicesInput, ProfessionalUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutServicesInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutServicesInput = {
    create?: XOR<CategoryCreateWithoutServicesInput, CategoryUncheckedCreateWithoutServicesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutServicesInput
    connect?: CategoryWhereUniqueInput
  }

  export type OrderCreateNestedManyWithoutServiceInput = {
    create?: XOR<OrderCreateWithoutServiceInput, OrderUncheckedCreateWithoutServiceInput> | OrderCreateWithoutServiceInput[] | OrderUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutServiceInput | OrderCreateOrConnectWithoutServiceInput[]
    createMany?: OrderCreateManyServiceInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type OrderUncheckedCreateNestedManyWithoutServiceInput = {
    create?: XOR<OrderCreateWithoutServiceInput, OrderUncheckedCreateWithoutServiceInput> | OrderCreateWithoutServiceInput[] | OrderUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutServiceInput | OrderCreateOrConnectWithoutServiceInput[]
    createMany?: OrderCreateManyServiceInputEnvelope
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
  }

  export type NullableDecimalFieldUpdateOperationsInput = {
    set?: Decimal | DecimalJsLike | number | string | null
    increment?: Decimal | DecimalJsLike | number | string
    decrement?: Decimal | DecimalJsLike | number | string
    multiply?: Decimal | DecimalJsLike | number | string
    divide?: Decimal | DecimalJsLike | number | string
  }

  export type EnumServiceStatusFieldUpdateOperationsInput = {
    set?: $Enums.ServiceStatus
  }

  export type ProfessionalUpdateOneRequiredWithoutServicesNestedInput = {
    create?: XOR<ProfessionalCreateWithoutServicesInput, ProfessionalUncheckedCreateWithoutServicesInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutServicesInput
    upsert?: ProfessionalUpsertWithoutServicesInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutServicesInput, ProfessionalUpdateWithoutServicesInput>, ProfessionalUncheckedUpdateWithoutServicesInput>
  }

  export type CategoryUpdateOneWithoutServicesNestedInput = {
    create?: XOR<CategoryCreateWithoutServicesInput, CategoryUncheckedCreateWithoutServicesInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutServicesInput
    upsert?: CategoryUpsertWithoutServicesInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutServicesInput, CategoryUpdateWithoutServicesInput>, CategoryUncheckedUpdateWithoutServicesInput>
  }

  export type OrderUpdateManyWithoutServiceNestedInput = {
    create?: XOR<OrderCreateWithoutServiceInput, OrderUncheckedCreateWithoutServiceInput> | OrderCreateWithoutServiceInput[] | OrderUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutServiceInput | OrderCreateOrConnectWithoutServiceInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutServiceInput | OrderUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: OrderCreateManyServiceInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutServiceInput | OrderUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutServiceInput | OrderUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type OrderUncheckedUpdateManyWithoutServiceNestedInput = {
    create?: XOR<OrderCreateWithoutServiceInput, OrderUncheckedCreateWithoutServiceInput> | OrderCreateWithoutServiceInput[] | OrderUncheckedCreateWithoutServiceInput[]
    connectOrCreate?: OrderCreateOrConnectWithoutServiceInput | OrderCreateOrConnectWithoutServiceInput[]
    upsert?: OrderUpsertWithWhereUniqueWithoutServiceInput | OrderUpsertWithWhereUniqueWithoutServiceInput[]
    createMany?: OrderCreateManyServiceInputEnvelope
    set?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    disconnect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    delete?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    connect?: OrderWhereUniqueInput | OrderWhereUniqueInput[]
    update?: OrderUpdateWithWhereUniqueWithoutServiceInput | OrderUpdateWithWhereUniqueWithoutServiceInput[]
    updateMany?: OrderUpdateManyWithWhereWithoutServiceInput | OrderUpdateManyWithWhereWithoutServiceInput[]
    deleteMany?: OrderScalarWhereInput | OrderScalarWhereInput[]
  }

  export type ClientCreateNestedOneWithoutOrdersInput = {
    create?: XOR<ClientCreateWithoutOrdersInput, ClientUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ClientCreateOrConnectWithoutOrdersInput
    connect?: ClientWhereUniqueInput
  }

  export type ProfessionalCreateNestedOneWithoutOrdersInput = {
    create?: XOR<ProfessionalCreateWithoutOrdersInput, ProfessionalUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutOrdersInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type ServiceCreateNestedOneWithoutOrdersInput = {
    create?: XOR<ServiceCreateWithoutOrdersInput, ServiceUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutOrdersInput
    connect?: ServiceWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutOrdersInput = {
    create?: XOR<CategoryCreateWithoutOrdersInput, CategoryUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutOrdersInput
    connect?: CategoryWhereUniqueInput
  }

  export type AppointmentCreateNestedManyWithoutOrderInput = {
    create?: XOR<AppointmentCreateWithoutOrderInput, AppointmentUncheckedCreateWithoutOrderInput> | AppointmentCreateWithoutOrderInput[] | AppointmentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutOrderInput | AppointmentCreateOrConnectWithoutOrderInput[]
    createMany?: AppointmentCreateManyOrderInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type AppointmentUncheckedCreateNestedManyWithoutOrderInput = {
    create?: XOR<AppointmentCreateWithoutOrderInput, AppointmentUncheckedCreateWithoutOrderInput> | AppointmentCreateWithoutOrderInput[] | AppointmentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutOrderInput | AppointmentCreateOrConnectWithoutOrderInput[]
    createMany?: AppointmentCreateManyOrderInputEnvelope
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
  }

  export type EnumOrderStatusFieldUpdateOperationsInput = {
    set?: $Enums.OrderStatus
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ClientUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<ClientCreateWithoutOrdersInput, ClientUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ClientCreateOrConnectWithoutOrdersInput
    upsert?: ClientUpsertWithoutOrdersInput
    connect?: ClientWhereUniqueInput
    update?: XOR<XOR<ClientUpdateToOneWithWhereWithoutOrdersInput, ClientUpdateWithoutOrdersInput>, ClientUncheckedUpdateWithoutOrdersInput>
  }

  export type ProfessionalUpdateOneRequiredWithoutOrdersNestedInput = {
    create?: XOR<ProfessionalCreateWithoutOrdersInput, ProfessionalUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutOrdersInput
    upsert?: ProfessionalUpsertWithoutOrdersInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutOrdersInput, ProfessionalUpdateWithoutOrdersInput>, ProfessionalUncheckedUpdateWithoutOrdersInput>
  }

  export type ServiceUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<ServiceCreateWithoutOrdersInput, ServiceUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: ServiceCreateOrConnectWithoutOrdersInput
    upsert?: ServiceUpsertWithoutOrdersInput
    disconnect?: ServiceWhereInput | boolean
    delete?: ServiceWhereInput | boolean
    connect?: ServiceWhereUniqueInput
    update?: XOR<XOR<ServiceUpdateToOneWithWhereWithoutOrdersInput, ServiceUpdateWithoutOrdersInput>, ServiceUncheckedUpdateWithoutOrdersInput>
  }

  export type CategoryUpdateOneWithoutOrdersNestedInput = {
    create?: XOR<CategoryCreateWithoutOrdersInput, CategoryUncheckedCreateWithoutOrdersInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutOrdersInput
    upsert?: CategoryUpsertWithoutOrdersInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutOrdersInput, CategoryUpdateWithoutOrdersInput>, CategoryUncheckedUpdateWithoutOrdersInput>
  }

  export type AppointmentUpdateManyWithoutOrderNestedInput = {
    create?: XOR<AppointmentCreateWithoutOrderInput, AppointmentUncheckedCreateWithoutOrderInput> | AppointmentCreateWithoutOrderInput[] | AppointmentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutOrderInput | AppointmentCreateOrConnectWithoutOrderInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutOrderInput | AppointmentUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: AppointmentCreateManyOrderInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutOrderInput | AppointmentUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutOrderInput | AppointmentUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type AppointmentUncheckedUpdateManyWithoutOrderNestedInput = {
    create?: XOR<AppointmentCreateWithoutOrderInput, AppointmentUncheckedCreateWithoutOrderInput> | AppointmentCreateWithoutOrderInput[] | AppointmentUncheckedCreateWithoutOrderInput[]
    connectOrCreate?: AppointmentCreateOrConnectWithoutOrderInput | AppointmentCreateOrConnectWithoutOrderInput[]
    upsert?: AppointmentUpsertWithWhereUniqueWithoutOrderInput | AppointmentUpsertWithWhereUniqueWithoutOrderInput[]
    createMany?: AppointmentCreateManyOrderInputEnvelope
    set?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    disconnect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    delete?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    connect?: AppointmentWhereUniqueInput | AppointmentWhereUniqueInput[]
    update?: AppointmentUpdateWithWhereUniqueWithoutOrderInput | AppointmentUpdateWithWhereUniqueWithoutOrderInput[]
    updateMany?: AppointmentUpdateManyWithWhereWithoutOrderInput | AppointmentUpdateManyWithWhereWithoutOrderInput[]
    deleteMany?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
  }

  export type ProfessionalCreateNestedOneWithoutPortfolioInput = {
    create?: XOR<ProfessionalCreateWithoutPortfolioInput, ProfessionalUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutPortfolioInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type CategoryCreateNestedOneWithoutPortfolioInput = {
    create?: XOR<CategoryCreateWithoutPortfolioInput, CategoryUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutPortfolioInput
    connect?: CategoryWhereUniqueInput
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type ProfessionalUpdateOneRequiredWithoutPortfolioNestedInput = {
    create?: XOR<ProfessionalCreateWithoutPortfolioInput, ProfessionalUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutPortfolioInput
    upsert?: ProfessionalUpsertWithoutPortfolioInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutPortfolioInput, ProfessionalUpdateWithoutPortfolioInput>, ProfessionalUncheckedUpdateWithoutPortfolioInput>
  }

  export type CategoryUpdateOneWithoutPortfolioNestedInput = {
    create?: XOR<CategoryCreateWithoutPortfolioInput, CategoryUncheckedCreateWithoutPortfolioInput>
    connectOrCreate?: CategoryCreateOrConnectWithoutPortfolioInput
    upsert?: CategoryUpsertWithoutPortfolioInput
    disconnect?: CategoryWhereInput | boolean
    delete?: CategoryWhereInput | boolean
    connect?: CategoryWhereUniqueInput
    update?: XOR<XOR<CategoryUpdateToOneWithWhereWithoutPortfolioInput, CategoryUpdateWithoutPortfolioInput>, CategoryUncheckedUpdateWithoutPortfolioInput>
  }

  export type ProfessionalCreateNestedOneWithoutTestimonialsInput = {
    create?: XOR<ProfessionalCreateWithoutTestimonialsInput, ProfessionalUncheckedCreateWithoutTestimonialsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutTestimonialsInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type UserCreateNestedOneWithoutTestimonialsInput = {
    create?: XOR<UserCreateWithoutTestimonialsInput, UserUncheckedCreateWithoutTestimonialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTestimonialsInput
    connect?: UserWhereUniqueInput
  }

  export type ProfessionalUpdateOneRequiredWithoutTestimonialsNestedInput = {
    create?: XOR<ProfessionalCreateWithoutTestimonialsInput, ProfessionalUncheckedCreateWithoutTestimonialsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutTestimonialsInput
    upsert?: ProfessionalUpsertWithoutTestimonialsInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutTestimonialsInput, ProfessionalUpdateWithoutTestimonialsInput>, ProfessionalUncheckedUpdateWithoutTestimonialsInput>
  }

  export type UserUpdateOneWithoutTestimonialsNestedInput = {
    create?: XOR<UserCreateWithoutTestimonialsInput, UserUncheckedCreateWithoutTestimonialsInput>
    connectOrCreate?: UserCreateOrConnectWithoutTestimonialsInput
    upsert?: UserUpsertWithoutTestimonialsInput
    disconnect?: UserWhereInput | boolean
    delete?: UserWhereInput | boolean
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutTestimonialsInput, UserUpdateWithoutTestimonialsInput>, UserUncheckedUpdateWithoutTestimonialsInput>
  }

  export type OrderCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<OrderCreateWithoutAppointmentsInput, OrderUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutAppointmentsInput
    connect?: OrderWhereUniqueInput
  }

  export type ProfessionalCreateNestedOneWithoutAppointmentsInput = {
    create?: XOR<ProfessionalCreateWithoutAppointmentsInput, ProfessionalUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutAppointmentsInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type EnumAppointmentStatusFieldUpdateOperationsInput = {
    set?: $Enums.AppointmentStatus
  }

  export type OrderUpdateOneWithoutAppointmentsNestedInput = {
    create?: XOR<OrderCreateWithoutAppointmentsInput, OrderUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: OrderCreateOrConnectWithoutAppointmentsInput
    upsert?: OrderUpsertWithoutAppointmentsInput
    disconnect?: OrderWhereInput | boolean
    delete?: OrderWhereInput | boolean
    connect?: OrderWhereUniqueInput
    update?: XOR<XOR<OrderUpdateToOneWithWhereWithoutAppointmentsInput, OrderUpdateWithoutAppointmentsInput>, OrderUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ProfessionalUpdateOneRequiredWithoutAppointmentsNestedInput = {
    create?: XOR<ProfessionalCreateWithoutAppointmentsInput, ProfessionalUncheckedCreateWithoutAppointmentsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutAppointmentsInput
    upsert?: ProfessionalUpsertWithoutAppointmentsInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutAppointmentsInput, ProfessionalUpdateWithoutAppointmentsInput>, ProfessionalUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ProfessionalCreateNestedOneWithoutCertificationsInput = {
    create?: XOR<ProfessionalCreateWithoutCertificationsInput, ProfessionalUncheckedCreateWithoutCertificationsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutCertificationsInput
    connect?: ProfessionalWhereUniqueInput
  }

  export type ProfessionalUpdateOneRequiredWithoutCertificationsNestedInput = {
    create?: XOR<ProfessionalCreateWithoutCertificationsInput, ProfessionalUncheckedCreateWithoutCertificationsInput>
    connectOrCreate?: ProfessionalCreateOrConnectWithoutCertificationsInput
    upsert?: ProfessionalUpsertWithoutCertificationsInput
    connect?: ProfessionalWhereUniqueInput
    update?: XOR<XOR<ProfessionalUpdateToOneWithWhereWithoutCertificationsInput, ProfessionalUpdateWithoutCertificationsInput>, ProfessionalUncheckedUpdateWithoutCertificationsInput>
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDecimalFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedDecimalWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    in?: Decimal[] | DecimalJsLike[] | number[] | string[]
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[]
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedDecimalFilter<$PrismaModel>
    _sum?: NestedDecimalFilter<$PrismaModel>
    _min?: NestedDecimalFilter<$PrismaModel>
    _max?: NestedDecimalFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedDecimalNullableFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
  }

  export type NestedEnumServiceStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[]
    notIn?: $Enums.ServiceStatus[]
    not?: NestedEnumServiceStatusFilter<$PrismaModel> | $Enums.ServiceStatus
  }

  export type NestedDecimalNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel> | null
    in?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    notIn?: Decimal[] | DecimalJsLike[] | number[] | string[] | null
    lt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    lte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gt?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    gte?: Decimal | DecimalJsLike | number | string | DecimalFieldRefInput<$PrismaModel>
    not?: NestedDecimalNullableWithAggregatesFilter<$PrismaModel> | Decimal | DecimalJsLike | number | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedDecimalNullableFilter<$PrismaModel>
    _sum?: NestedDecimalNullableFilter<$PrismaModel>
    _min?: NestedDecimalNullableFilter<$PrismaModel>
    _max?: NestedDecimalNullableFilter<$PrismaModel>
  }

  export type NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.ServiceStatus | EnumServiceStatusFieldRefInput<$PrismaModel>
    in?: $Enums.ServiceStatus[]
    notIn?: $Enums.ServiceStatus[]
    not?: NestedEnumServiceStatusWithAggregatesFilter<$PrismaModel> | $Enums.ServiceStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumServiceStatusFilter<$PrismaModel>
    _max?: NestedEnumServiceStatusFilter<$PrismaModel>
  }

  export type NestedEnumOrderStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusFilter<$PrismaModel> | $Enums.OrderStatus
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.OrderStatus | EnumOrderStatusFieldRefInput<$PrismaModel>
    in?: $Enums.OrderStatus[]
    notIn?: $Enums.OrderStatus[]
    not?: NestedEnumOrderStatusWithAggregatesFilter<$PrismaModel> | $Enums.OrderStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumOrderStatusFilter<$PrismaModel>
    _max?: NestedEnumOrderStatusFilter<$PrismaModel>
  }
  export type NestedJsonNullableFilter<$PrismaModel = never> =
    | PatchUndefined<
        Either<Required<NestedJsonNullableFilterBase<$PrismaModel>>, Exclude<keyof Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>,
        Required<NestedJsonNullableFilterBase<$PrismaModel>>
      >
    | OptionalFlat<Omit<Required<NestedJsonNullableFilterBase<$PrismaModel>>, 'path'>>

  export type NestedJsonNullableFilterBase<$PrismaModel = never> = {
    equals?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
    path?: string
    mode?: QueryMode | EnumQueryModeFieldRefInput<$PrismaModel>
    string_contains?: string | StringFieldRefInput<$PrismaModel>
    string_starts_with?: string | StringFieldRefInput<$PrismaModel>
    string_ends_with?: string | StringFieldRefInput<$PrismaModel>
    array_starts_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_ends_with?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    array_contains?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | null
    lt?: InputJsonValue
    lte?: InputJsonValue
    gt?: InputJsonValue
    gte?: InputJsonValue
    not?: InputJsonValue | JsonFieldRefInput<$PrismaModel> | JsonNullValueFilter
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedEnumAppointmentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[]
    notIn?: $Enums.AppointmentStatus[]
    not?: NestedEnumAppointmentStatusFilter<$PrismaModel> | $Enums.AppointmentStatus
  }

  export type NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.AppointmentStatus | EnumAppointmentStatusFieldRefInput<$PrismaModel>
    in?: $Enums.AppointmentStatus[]
    notIn?: $Enums.AppointmentStatus[]
    not?: NestedEnumAppointmentStatusWithAggregatesFilter<$PrismaModel> | $Enums.AppointmentStatus
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumAppointmentStatusFilter<$PrismaModel>
    _max?: NestedEnumAppointmentStatusFilter<$PrismaModel>
  }

  export type ClientCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    orders?: OrderCreateNestedManyWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutUserInput = {
    id?: string
    createdAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutClientInput
  }

  export type ClientCreateOrConnectWithoutUserInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
  }

  export type ProfessionalCreateWithoutUserInput = {
    id?: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProfessionalCategoryCreateNestedManyWithoutProfessionalInput
    services?: ServiceCreateNestedManyWithoutProfessionalInput
    orders?: OrderCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutUserInput = {
    id?: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProfessionalCategoryUncheckedCreateNestedManyWithoutProfessionalInput
    services?: ServiceUncheckedCreateNestedManyWithoutProfessionalInput
    orders?: OrderUncheckedCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutUserInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutUserInput, ProfessionalUncheckedCreateWithoutUserInput>
  }

  export type TestimonialCreateWithoutAuthorInput = {
    id?: string
    authorName?: string | null
    authorRole?: string | null
    content: string
    rating: number
    createdAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutTestimonialsInput
  }

  export type TestimonialUncheckedCreateWithoutAuthorInput = {
    id?: string
    professionalId: string
    authorName?: string | null
    authorRole?: string | null
    content: string
    rating: number
    createdAt?: Date | string
  }

  export type TestimonialCreateOrConnectWithoutAuthorInput = {
    where: TestimonialWhereUniqueInput
    create: XOR<TestimonialCreateWithoutAuthorInput, TestimonialUncheckedCreateWithoutAuthorInput>
  }

  export type TestimonialCreateManyAuthorInputEnvelope = {
    data: TestimonialCreateManyAuthorInput | TestimonialCreateManyAuthorInput[]
    skipDuplicates?: boolean
  }

  export type ClientUpsertWithoutUserInput = {
    update: XOR<ClientUpdateWithoutUserInput, ClientUncheckedUpdateWithoutUserInput>
    create: XOR<ClientCreateWithoutUserInput, ClientUncheckedCreateWithoutUserInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutUserInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutUserInput, ClientUncheckedUpdateWithoutUserInput>
  }

  export type ClientUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUpdateManyWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutClientNestedInput
  }

  export type ProfessionalUpsertWithoutUserInput = {
    update: XOR<ProfessionalUpdateWithoutUserInput, ProfessionalUncheckedUpdateWithoutUserInput>
    create: XOR<ProfessionalCreateWithoutUserInput, ProfessionalUncheckedCreateWithoutUserInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutUserInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutUserInput, ProfessionalUncheckedUpdateWithoutUserInput>
  }

  export type ProfessionalUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProfessionalCategoryUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProfessionalCategoryUncheckedUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUncheckedUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUncheckedUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type TestimonialUpsertWithWhereUniqueWithoutAuthorInput = {
    where: TestimonialWhereUniqueInput
    update: XOR<TestimonialUpdateWithoutAuthorInput, TestimonialUncheckedUpdateWithoutAuthorInput>
    create: XOR<TestimonialCreateWithoutAuthorInput, TestimonialUncheckedCreateWithoutAuthorInput>
  }

  export type TestimonialUpdateWithWhereUniqueWithoutAuthorInput = {
    where: TestimonialWhereUniqueInput
    data: XOR<TestimonialUpdateWithoutAuthorInput, TestimonialUncheckedUpdateWithoutAuthorInput>
  }

  export type TestimonialUpdateManyWithWhereWithoutAuthorInput = {
    where: TestimonialScalarWhereInput
    data: XOR<TestimonialUpdateManyMutationInput, TestimonialUncheckedUpdateManyWithoutAuthorInput>
  }

  export type TestimonialScalarWhereInput = {
    AND?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
    OR?: TestimonialScalarWhereInput[]
    NOT?: TestimonialScalarWhereInput | TestimonialScalarWhereInput[]
    id?: StringFilter<"Testimonial"> | string
    professionalId?: StringFilter<"Testimonial"> | string
    authorId?: StringNullableFilter<"Testimonial"> | string | null
    authorName?: StringNullableFilter<"Testimonial"> | string | null
    authorRole?: StringNullableFilter<"Testimonial"> | string | null
    content?: StringFilter<"Testimonial"> | string
    rating?: IntFilter<"Testimonial"> | number
    createdAt?: DateTimeFilter<"Testimonial"> | Date | string
  }

  export type UserCreateWithoutClientInput = {
    id?: string
    name: string
    email: string
    password: string
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    professional?: ProfessionalCreateNestedOneWithoutUserInput
    testimonials?: TestimonialCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutClientInput = {
    id?: string
    name: string
    email: string
    password: string
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    professional?: ProfessionalUncheckedCreateNestedOneWithoutUserInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutClientInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutClientInput, UserUncheckedCreateWithoutClientInput>
  }

  export type OrderCreateWithoutClientInput = {
    id?: string
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutOrdersInput
    service?: ServiceCreateNestedOneWithoutOrdersInput
    category?: CategoryCreateNestedOneWithoutOrdersInput
    appointments?: AppointmentCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutClientInput = {
    id?: string
    professionalId: string
    serviceId?: string | null
    categoryId?: string | null
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutClientInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput>
  }

  export type OrderCreateManyClientInputEnvelope = {
    data: OrderCreateManyClientInput | OrderCreateManyClientInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutClientInput = {
    update: XOR<UserUpdateWithoutClientInput, UserUncheckedUpdateWithoutClientInput>
    create: XOR<UserCreateWithoutClientInput, UserUncheckedCreateWithoutClientInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutClientInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutClientInput, UserUncheckedUpdateWithoutClientInput>
  }

  export type UserUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneWithoutUserNestedInput
    testimonials?: TestimonialUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUncheckedUpdateOneWithoutUserNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutClientInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutClientInput, OrderUncheckedUpdateWithoutClientInput>
    create: XOR<OrderCreateWithoutClientInput, OrderUncheckedCreateWithoutClientInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutClientInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutClientInput, OrderUncheckedUpdateWithoutClientInput>
  }

  export type OrderUpdateManyWithWhereWithoutClientInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutClientInput>
  }

  export type OrderScalarWhereInput = {
    AND?: OrderScalarWhereInput | OrderScalarWhereInput[]
    OR?: OrderScalarWhereInput[]
    NOT?: OrderScalarWhereInput | OrderScalarWhereInput[]
    id?: StringFilter<"Order"> | string
    clientId?: StringFilter<"Order"> | string
    professionalId?: StringFilter<"Order"> | string
    serviceId?: StringNullableFilter<"Order"> | string | null
    categoryId?: StringNullableFilter<"Order"> | string | null
    status?: EnumOrderStatusFilter<"Order"> | $Enums.OrderStatus
    serviceType?: StringNullableFilter<"Order"> | string | null
    description?: StringNullableFilter<"Order"> | string | null
    locationCep?: StringNullableFilter<"Order"> | string | null
    address?: StringNullableFilter<"Order"> | string | null
    urgency?: StringNullableFilter<"Order"> | string | null
    attachments?: JsonNullableFilter<"Order">
    agreedPrice?: DecimalNullableFilter<"Order"> | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: DateTimeNullableFilter<"Order"> | Date | string | null
    notes?: StringNullableFilter<"Order"> | string | null
    createdAt?: DateTimeFilter<"Order"> | Date | string
    updatedAt?: DateTimeFilter<"Order"> | Date | string
  }

  export type UserCreateWithoutProfessionalInput = {
    id?: string
    name: string
    email: string
    password: string
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client?: ClientCreateNestedOneWithoutUserInput
    testimonials?: TestimonialCreateNestedManyWithoutAuthorInput
  }

  export type UserUncheckedCreateWithoutProfessionalInput = {
    id?: string
    name: string
    email: string
    password: string
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutAuthorInput
  }

  export type UserCreateOrConnectWithoutProfessionalInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutProfessionalInput, UserUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalCategoryCreateWithoutProfessionalInput = {
    category: CategoryCreateNestedOneWithoutProfessionalsInput
  }

  export type ProfessionalCategoryUncheckedCreateWithoutProfessionalInput = {
    categoryId: string
  }

  export type ProfessionalCategoryCreateOrConnectWithoutProfessionalInput = {
    where: ProfessionalCategoryWhereUniqueInput
    create: XOR<ProfessionalCategoryCreateWithoutProfessionalInput, ProfessionalCategoryUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalCategoryCreateManyProfessionalInputEnvelope = {
    data: ProfessionalCategoryCreateManyProfessionalInput | ProfessionalCategoryCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutProfessionalInput = {
    id?: string
    title: string
    priceText?: string | null
    priceValue?: Decimal | DecimalJsLike | number | string | null
    duration?: string | null
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    category?: CategoryCreateNestedOneWithoutServicesInput
    orders?: OrderCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutProfessionalInput = {
    id?: string
    categoryId?: string | null
    title: string
    priceText?: string | null
    priceValue?: Decimal | DecimalJsLike | number | string | null
    duration?: string | null
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutProfessionalInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutProfessionalInput, ServiceUncheckedCreateWithoutProfessionalInput>
  }

  export type ServiceCreateManyProfessionalInputEnvelope = {
    data: ServiceCreateManyProfessionalInput | ServiceCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutProfessionalInput = {
    id?: string
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutOrdersInput
    service?: ServiceCreateNestedOneWithoutOrdersInput
    category?: CategoryCreateNestedOneWithoutOrdersInput
    appointments?: AppointmentCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutProfessionalInput = {
    id?: string
    clientId: string
    serviceId?: string | null
    categoryId?: string | null
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutProfessionalInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutProfessionalInput, OrderUncheckedCreateWithoutProfessionalInput>
  }

  export type OrderCreateManyProfessionalInputEnvelope = {
    data: OrderCreateManyProfessionalInput | OrderCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type PortfolioItemCreateWithoutProfessionalInput = {
    id?: string
    title: string
    imageUrl?: string | null
    year?: number | null
    createdAt?: Date | string
    category?: CategoryCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioItemUncheckedCreateWithoutProfessionalInput = {
    id?: string
    categoryId?: string | null
    title: string
    imageUrl?: string | null
    year?: number | null
    createdAt?: Date | string
  }

  export type PortfolioItemCreateOrConnectWithoutProfessionalInput = {
    where: PortfolioItemWhereUniqueInput
    create: XOR<PortfolioItemCreateWithoutProfessionalInput, PortfolioItemUncheckedCreateWithoutProfessionalInput>
  }

  export type PortfolioItemCreateManyProfessionalInputEnvelope = {
    data: PortfolioItemCreateManyProfessionalInput | PortfolioItemCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type TestimonialCreateWithoutProfessionalInput = {
    id?: string
    authorName?: string | null
    authorRole?: string | null
    content: string
    rating: number
    createdAt?: Date | string
    author?: UserCreateNestedOneWithoutTestimonialsInput
  }

  export type TestimonialUncheckedCreateWithoutProfessionalInput = {
    id?: string
    authorId?: string | null
    authorName?: string | null
    authorRole?: string | null
    content: string
    rating: number
    createdAt?: Date | string
  }

  export type TestimonialCreateOrConnectWithoutProfessionalInput = {
    where: TestimonialWhereUniqueInput
    create: XOR<TestimonialCreateWithoutProfessionalInput, TestimonialUncheckedCreateWithoutProfessionalInput>
  }

  export type TestimonialCreateManyProfessionalInputEnvelope = {
    data: TestimonialCreateManyProfessionalInput | TestimonialCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type AppointmentCreateWithoutProfessionalInput = {
    id?: string
    clientId: string
    scheduledAt: Date | string
    address?: string | null
    serviceName?: string | null
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    order?: OrderCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutProfessionalInput = {
    id?: string
    orderId?: string | null
    clientId: string
    scheduledAt: Date | string
    address?: string | null
    serviceName?: string | null
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutProfessionalInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutProfessionalInput, AppointmentUncheckedCreateWithoutProfessionalInput>
  }

  export type AppointmentCreateManyProfessionalInputEnvelope = {
    data: AppointmentCreateManyProfessionalInput | AppointmentCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type CertificationCreateWithoutProfessionalInput = {
    id?: string
    name: string
    issuedAt?: Date | string | null
    expiresAt?: Date | string | null
    issuer?: string | null
  }

  export type CertificationUncheckedCreateWithoutProfessionalInput = {
    id?: string
    name: string
    issuedAt?: Date | string | null
    expiresAt?: Date | string | null
    issuer?: string | null
  }

  export type CertificationCreateOrConnectWithoutProfessionalInput = {
    where: CertificationWhereUniqueInput
    create: XOR<CertificationCreateWithoutProfessionalInput, CertificationUncheckedCreateWithoutProfessionalInput>
  }

  export type CertificationCreateManyProfessionalInputEnvelope = {
    data: CertificationCreateManyProfessionalInput | CertificationCreateManyProfessionalInput[]
    skipDuplicates?: boolean
  }

  export type UserUpsertWithoutProfessionalInput = {
    update: XOR<UserUpdateWithoutProfessionalInput, UserUncheckedUpdateWithoutProfessionalInput>
    create: XOR<UserCreateWithoutProfessionalInput, UserUncheckedCreateWithoutProfessionalInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutProfessionalInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutProfessionalInput, UserUncheckedUpdateWithoutProfessionalInput>
  }

  export type UserUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneWithoutUserNestedInput
    testimonials?: TestimonialUpdateManyWithoutAuthorNestedInput
  }

  export type UserUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutAuthorNestedInput
  }

  export type ProfessionalCategoryUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalCategoryWhereUniqueInput
    update: XOR<ProfessionalCategoryUpdateWithoutProfessionalInput, ProfessionalCategoryUncheckedUpdateWithoutProfessionalInput>
    create: XOR<ProfessionalCategoryCreateWithoutProfessionalInput, ProfessionalCategoryUncheckedCreateWithoutProfessionalInput>
  }

  export type ProfessionalCategoryUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: ProfessionalCategoryWhereUniqueInput
    data: XOR<ProfessionalCategoryUpdateWithoutProfessionalInput, ProfessionalCategoryUncheckedUpdateWithoutProfessionalInput>
  }

  export type ProfessionalCategoryUpdateManyWithWhereWithoutProfessionalInput = {
    where: ProfessionalCategoryScalarWhereInput
    data: XOR<ProfessionalCategoryUpdateManyMutationInput, ProfessionalCategoryUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type ProfessionalCategoryScalarWhereInput = {
    AND?: ProfessionalCategoryScalarWhereInput | ProfessionalCategoryScalarWhereInput[]
    OR?: ProfessionalCategoryScalarWhereInput[]
    NOT?: ProfessionalCategoryScalarWhereInput | ProfessionalCategoryScalarWhereInput[]
    professionalId?: StringFilter<"ProfessionalCategory"> | string
    categoryId?: StringFilter<"ProfessionalCategory"> | string
  }

  export type ServiceUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutProfessionalInput, ServiceUncheckedUpdateWithoutProfessionalInput>
    create: XOR<ServiceCreateWithoutProfessionalInput, ServiceUncheckedCreateWithoutProfessionalInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutProfessionalInput, ServiceUncheckedUpdateWithoutProfessionalInput>
  }

  export type ServiceUpdateManyWithWhereWithoutProfessionalInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type ServiceScalarWhereInput = {
    AND?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    OR?: ServiceScalarWhereInput[]
    NOT?: ServiceScalarWhereInput | ServiceScalarWhereInput[]
    id?: StringFilter<"Service"> | string
    professionalId?: StringFilter<"Service"> | string
    categoryId?: StringNullableFilter<"Service"> | string | null
    title?: StringFilter<"Service"> | string
    priceText?: StringNullableFilter<"Service"> | string | null
    priceValue?: DecimalNullableFilter<"Service"> | Decimal | DecimalJsLike | number | string | null
    duration?: StringNullableFilter<"Service"> | string | null
    status?: EnumServiceStatusFilter<"Service"> | $Enums.ServiceStatus
    createdAt?: DateTimeFilter<"Service"> | Date | string
    updatedAt?: DateTimeFilter<"Service"> | Date | string
  }

  export type OrderUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutProfessionalInput, OrderUncheckedUpdateWithoutProfessionalInput>
    create: XOR<OrderCreateWithoutProfessionalInput, OrderUncheckedCreateWithoutProfessionalInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutProfessionalInput, OrderUncheckedUpdateWithoutProfessionalInput>
  }

  export type OrderUpdateManyWithWhereWithoutProfessionalInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type PortfolioItemUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: PortfolioItemWhereUniqueInput
    update: XOR<PortfolioItemUpdateWithoutProfessionalInput, PortfolioItemUncheckedUpdateWithoutProfessionalInput>
    create: XOR<PortfolioItemCreateWithoutProfessionalInput, PortfolioItemUncheckedCreateWithoutProfessionalInput>
  }

  export type PortfolioItemUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: PortfolioItemWhereUniqueInput
    data: XOR<PortfolioItemUpdateWithoutProfessionalInput, PortfolioItemUncheckedUpdateWithoutProfessionalInput>
  }

  export type PortfolioItemUpdateManyWithWhereWithoutProfessionalInput = {
    where: PortfolioItemScalarWhereInput
    data: XOR<PortfolioItemUpdateManyMutationInput, PortfolioItemUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type PortfolioItemScalarWhereInput = {
    AND?: PortfolioItemScalarWhereInput | PortfolioItemScalarWhereInput[]
    OR?: PortfolioItemScalarWhereInput[]
    NOT?: PortfolioItemScalarWhereInput | PortfolioItemScalarWhereInput[]
    id?: StringFilter<"PortfolioItem"> | string
    professionalId?: StringFilter<"PortfolioItem"> | string
    categoryId?: StringNullableFilter<"PortfolioItem"> | string | null
    title?: StringFilter<"PortfolioItem"> | string
    imageUrl?: StringNullableFilter<"PortfolioItem"> | string | null
    year?: IntNullableFilter<"PortfolioItem"> | number | null
    createdAt?: DateTimeFilter<"PortfolioItem"> | Date | string
  }

  export type TestimonialUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: TestimonialWhereUniqueInput
    update: XOR<TestimonialUpdateWithoutProfessionalInput, TestimonialUncheckedUpdateWithoutProfessionalInput>
    create: XOR<TestimonialCreateWithoutProfessionalInput, TestimonialUncheckedCreateWithoutProfessionalInput>
  }

  export type TestimonialUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: TestimonialWhereUniqueInput
    data: XOR<TestimonialUpdateWithoutProfessionalInput, TestimonialUncheckedUpdateWithoutProfessionalInput>
  }

  export type TestimonialUpdateManyWithWhereWithoutProfessionalInput = {
    where: TestimonialScalarWhereInput
    data: XOR<TestimonialUpdateManyMutationInput, TestimonialUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type AppointmentUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutProfessionalInput, AppointmentUncheckedUpdateWithoutProfessionalInput>
    create: XOR<AppointmentCreateWithoutProfessionalInput, AppointmentUncheckedCreateWithoutProfessionalInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutProfessionalInput, AppointmentUncheckedUpdateWithoutProfessionalInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutProfessionalInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type AppointmentScalarWhereInput = {
    AND?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    OR?: AppointmentScalarWhereInput[]
    NOT?: AppointmentScalarWhereInput | AppointmentScalarWhereInput[]
    id?: StringFilter<"Appointment"> | string
    orderId?: StringNullableFilter<"Appointment"> | string | null
    professionalId?: StringFilter<"Appointment"> | string
    clientId?: StringFilter<"Appointment"> | string
    scheduledAt?: DateTimeFilter<"Appointment"> | Date | string
    address?: StringNullableFilter<"Appointment"> | string | null
    serviceName?: StringNullableFilter<"Appointment"> | string | null
    status?: EnumAppointmentStatusFilter<"Appointment"> | $Enums.AppointmentStatus
    notes?: StringNullableFilter<"Appointment"> | string | null
    createdAt?: DateTimeFilter<"Appointment"> | Date | string
  }

  export type CertificationUpsertWithWhereUniqueWithoutProfessionalInput = {
    where: CertificationWhereUniqueInput
    update: XOR<CertificationUpdateWithoutProfessionalInput, CertificationUncheckedUpdateWithoutProfessionalInput>
    create: XOR<CertificationCreateWithoutProfessionalInput, CertificationUncheckedCreateWithoutProfessionalInput>
  }

  export type CertificationUpdateWithWhereUniqueWithoutProfessionalInput = {
    where: CertificationWhereUniqueInput
    data: XOR<CertificationUpdateWithoutProfessionalInput, CertificationUncheckedUpdateWithoutProfessionalInput>
  }

  export type CertificationUpdateManyWithWhereWithoutProfessionalInput = {
    where: CertificationScalarWhereInput
    data: XOR<CertificationUpdateManyMutationInput, CertificationUncheckedUpdateManyWithoutProfessionalInput>
  }

  export type CertificationScalarWhereInput = {
    AND?: CertificationScalarWhereInput | CertificationScalarWhereInput[]
    OR?: CertificationScalarWhereInput[]
    NOT?: CertificationScalarWhereInput | CertificationScalarWhereInput[]
    id?: StringFilter<"Certification"> | string
    professionalId?: StringFilter<"Certification"> | string
    name?: StringFilter<"Certification"> | string
    issuedAt?: DateTimeNullableFilter<"Certification"> | Date | string | null
    expiresAt?: DateTimeNullableFilter<"Certification"> | Date | string | null
    issuer?: StringNullableFilter<"Certification"> | string | null
  }

  export type ProfessionalCategoryCreateWithoutCategoryInput = {
    professional: ProfessionalCreateNestedOneWithoutCategoriesInput
  }

  export type ProfessionalCategoryUncheckedCreateWithoutCategoryInput = {
    professionalId: string
  }

  export type ProfessionalCategoryCreateOrConnectWithoutCategoryInput = {
    where: ProfessionalCategoryWhereUniqueInput
    create: XOR<ProfessionalCategoryCreateWithoutCategoryInput, ProfessionalCategoryUncheckedCreateWithoutCategoryInput>
  }

  export type ProfessionalCategoryCreateManyCategoryInputEnvelope = {
    data: ProfessionalCategoryCreateManyCategoryInput | ProfessionalCategoryCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ServiceCreateWithoutCategoryInput = {
    id?: string
    title: string
    priceText?: string | null
    priceValue?: Decimal | DecimalJsLike | number | string | null
    duration?: string | null
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutServicesInput
    orders?: OrderCreateNestedManyWithoutServiceInput
  }

  export type ServiceUncheckedCreateWithoutCategoryInput = {
    id?: string
    professionalId: string
    title: string
    priceText?: string | null
    priceValue?: Decimal | DecimalJsLike | number | string | null
    duration?: string | null
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    orders?: OrderUncheckedCreateNestedManyWithoutServiceInput
  }

  export type ServiceCreateOrConnectWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput>
  }

  export type ServiceCreateManyCategoryInputEnvelope = {
    data: ServiceCreateManyCategoryInput | ServiceCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type OrderCreateWithoutCategoryInput = {
    id?: string
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutOrdersInput
    professional: ProfessionalCreateNestedOneWithoutOrdersInput
    service?: ServiceCreateNestedOneWithoutOrdersInput
    appointments?: AppointmentCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutCategoryInput = {
    id?: string
    clientId: string
    professionalId: string
    serviceId?: string | null
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutCategoryInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutCategoryInput, OrderUncheckedCreateWithoutCategoryInput>
  }

  export type OrderCreateManyCategoryInputEnvelope = {
    data: OrderCreateManyCategoryInput | OrderCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type PortfolioItemCreateWithoutCategoryInput = {
    id?: string
    title: string
    imageUrl?: string | null
    year?: number | null
    createdAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutPortfolioInput
  }

  export type PortfolioItemUncheckedCreateWithoutCategoryInput = {
    id?: string
    professionalId: string
    title: string
    imageUrl?: string | null
    year?: number | null
    createdAt?: Date | string
  }

  export type PortfolioItemCreateOrConnectWithoutCategoryInput = {
    where: PortfolioItemWhereUniqueInput
    create: XOR<PortfolioItemCreateWithoutCategoryInput, PortfolioItemUncheckedCreateWithoutCategoryInput>
  }

  export type PortfolioItemCreateManyCategoryInputEnvelope = {
    data: PortfolioItemCreateManyCategoryInput | PortfolioItemCreateManyCategoryInput[]
    skipDuplicates?: boolean
  }

  export type ProfessionalCategoryUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ProfessionalCategoryWhereUniqueInput
    update: XOR<ProfessionalCategoryUpdateWithoutCategoryInput, ProfessionalCategoryUncheckedUpdateWithoutCategoryInput>
    create: XOR<ProfessionalCategoryCreateWithoutCategoryInput, ProfessionalCategoryUncheckedCreateWithoutCategoryInput>
  }

  export type ProfessionalCategoryUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ProfessionalCategoryWhereUniqueInput
    data: XOR<ProfessionalCategoryUpdateWithoutCategoryInput, ProfessionalCategoryUncheckedUpdateWithoutCategoryInput>
  }

  export type ProfessionalCategoryUpdateManyWithWhereWithoutCategoryInput = {
    where: ProfessionalCategoryScalarWhereInput
    data: XOR<ProfessionalCategoryUpdateManyMutationInput, ProfessionalCategoryUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ServiceUpsertWithWhereUniqueWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    update: XOR<ServiceUpdateWithoutCategoryInput, ServiceUncheckedUpdateWithoutCategoryInput>
    create: XOR<ServiceCreateWithoutCategoryInput, ServiceUncheckedCreateWithoutCategoryInput>
  }

  export type ServiceUpdateWithWhereUniqueWithoutCategoryInput = {
    where: ServiceWhereUniqueInput
    data: XOR<ServiceUpdateWithoutCategoryInput, ServiceUncheckedUpdateWithoutCategoryInput>
  }

  export type ServiceUpdateManyWithWhereWithoutCategoryInput = {
    where: ServiceScalarWhereInput
    data: XOR<ServiceUpdateManyMutationInput, ServiceUncheckedUpdateManyWithoutCategoryInput>
  }

  export type OrderUpsertWithWhereUniqueWithoutCategoryInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutCategoryInput, OrderUncheckedUpdateWithoutCategoryInput>
    create: XOR<OrderCreateWithoutCategoryInput, OrderUncheckedCreateWithoutCategoryInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutCategoryInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutCategoryInput, OrderUncheckedUpdateWithoutCategoryInput>
  }

  export type OrderUpdateManyWithWhereWithoutCategoryInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutCategoryInput>
  }

  export type PortfolioItemUpsertWithWhereUniqueWithoutCategoryInput = {
    where: PortfolioItemWhereUniqueInput
    update: XOR<PortfolioItemUpdateWithoutCategoryInput, PortfolioItemUncheckedUpdateWithoutCategoryInput>
    create: XOR<PortfolioItemCreateWithoutCategoryInput, PortfolioItemUncheckedCreateWithoutCategoryInput>
  }

  export type PortfolioItemUpdateWithWhereUniqueWithoutCategoryInput = {
    where: PortfolioItemWhereUniqueInput
    data: XOR<PortfolioItemUpdateWithoutCategoryInput, PortfolioItemUncheckedUpdateWithoutCategoryInput>
  }

  export type PortfolioItemUpdateManyWithWhereWithoutCategoryInput = {
    where: PortfolioItemScalarWhereInput
    data: XOR<PortfolioItemUpdateManyMutationInput, PortfolioItemUncheckedUpdateManyWithoutCategoryInput>
  }

  export type ProfessionalCreateWithoutCategoriesInput = {
    id?: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfessionalInput
    services?: ServiceCreateNestedManyWithoutProfessionalInput
    orders?: OrderCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutCategoriesInput = {
    id?: string
    userId: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutProfessionalInput
    orders?: OrderUncheckedCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutCategoriesInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutCategoriesInput, ProfessionalUncheckedCreateWithoutCategoriesInput>
  }

  export type CategoryCreateWithoutProfessionalsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    services?: ServiceCreateNestedManyWithoutCategoryInput
    orders?: OrderCreateNestedManyWithoutCategoryInput
    portfolio?: PortfolioItemCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutProfessionalsInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
    orders?: OrderUncheckedCreateNestedManyWithoutCategoryInput
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutProfessionalsInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutProfessionalsInput, CategoryUncheckedCreateWithoutProfessionalsInput>
  }

  export type ProfessionalUpsertWithoutCategoriesInput = {
    update: XOR<ProfessionalUpdateWithoutCategoriesInput, ProfessionalUncheckedUpdateWithoutCategoriesInput>
    create: XOR<ProfessionalCreateWithoutCategoriesInput, ProfessionalUncheckedCreateWithoutCategoriesInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutCategoriesInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutCategoriesInput, ProfessionalUncheckedUpdateWithoutCategoriesInput>
  }

  export type ProfessionalUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfessionalNestedInput
    services?: ServiceUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutCategoriesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUncheckedUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type CategoryUpsertWithoutProfessionalsInput = {
    update: XOR<CategoryUpdateWithoutProfessionalsInput, CategoryUncheckedUpdateWithoutProfessionalsInput>
    create: XOR<CategoryCreateWithoutProfessionalsInput, CategoryUncheckedCreateWithoutProfessionalsInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutProfessionalsInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutProfessionalsInput, CategoryUncheckedUpdateWithoutProfessionalsInput>
  }

  export type CategoryUpdateWithoutProfessionalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUpdateManyWithoutCategoryNestedInput
    orders?: OrderUpdateManyWithoutCategoryNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutProfessionalsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
    orders?: OrderUncheckedUpdateManyWithoutCategoryNestedInput
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ProfessionalCreateWithoutServicesInput = {
    id?: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfessionalInput
    categories?: ProfessionalCategoryCreateNestedManyWithoutProfessionalInput
    orders?: OrderCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutServicesInput = {
    id?: string
    userId: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProfessionalCategoryUncheckedCreateNestedManyWithoutProfessionalInput
    orders?: OrderUncheckedCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutServicesInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutServicesInput, ProfessionalUncheckedCreateWithoutServicesInput>
  }

  export type CategoryCreateWithoutServicesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    professionals?: ProfessionalCategoryCreateNestedManyWithoutCategoryInput
    orders?: OrderCreateNestedManyWithoutCategoryInput
    portfolio?: PortfolioItemCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutServicesInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    professionals?: ProfessionalCategoryUncheckedCreateNestedManyWithoutCategoryInput
    orders?: OrderUncheckedCreateNestedManyWithoutCategoryInput
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutServicesInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutServicesInput, CategoryUncheckedCreateWithoutServicesInput>
  }

  export type OrderCreateWithoutServiceInput = {
    id?: string
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutOrdersInput
    professional: ProfessionalCreateNestedOneWithoutOrdersInput
    category?: CategoryCreateNestedOneWithoutOrdersInput
    appointments?: AppointmentCreateNestedManyWithoutOrderInput
  }

  export type OrderUncheckedCreateWithoutServiceInput = {
    id?: string
    clientId: string
    professionalId: string
    categoryId?: string | null
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    appointments?: AppointmentUncheckedCreateNestedManyWithoutOrderInput
  }

  export type OrderCreateOrConnectWithoutServiceInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutServiceInput, OrderUncheckedCreateWithoutServiceInput>
  }

  export type OrderCreateManyServiceInputEnvelope = {
    data: OrderCreateManyServiceInput | OrderCreateManyServiceInput[]
    skipDuplicates?: boolean
  }

  export type ProfessionalUpsertWithoutServicesInput = {
    update: XOR<ProfessionalUpdateWithoutServicesInput, ProfessionalUncheckedUpdateWithoutServicesInput>
    create: XOR<ProfessionalCreateWithoutServicesInput, ProfessionalUncheckedCreateWithoutServicesInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutServicesInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutServicesInput, ProfessionalUncheckedUpdateWithoutServicesInput>
  }

  export type ProfessionalUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfessionalNestedInput
    categories?: ProfessionalCategoryUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProfessionalCategoryUncheckedUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUncheckedUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type CategoryUpsertWithoutServicesInput = {
    update: XOR<CategoryUpdateWithoutServicesInput, CategoryUncheckedUpdateWithoutServicesInput>
    create: XOR<CategoryCreateWithoutServicesInput, CategoryUncheckedCreateWithoutServicesInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutServicesInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutServicesInput, CategoryUncheckedUpdateWithoutServicesInput>
  }

  export type CategoryUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professionals?: ProfessionalCategoryUpdateManyWithoutCategoryNestedInput
    orders?: OrderUpdateManyWithoutCategoryNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutServicesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professionals?: ProfessionalCategoryUncheckedUpdateManyWithoutCategoryNestedInput
    orders?: OrderUncheckedUpdateManyWithoutCategoryNestedInput
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type OrderUpsertWithWhereUniqueWithoutServiceInput = {
    where: OrderWhereUniqueInput
    update: XOR<OrderUpdateWithoutServiceInput, OrderUncheckedUpdateWithoutServiceInput>
    create: XOR<OrderCreateWithoutServiceInput, OrderUncheckedCreateWithoutServiceInput>
  }

  export type OrderUpdateWithWhereUniqueWithoutServiceInput = {
    where: OrderWhereUniqueInput
    data: XOR<OrderUpdateWithoutServiceInput, OrderUncheckedUpdateWithoutServiceInput>
  }

  export type OrderUpdateManyWithWhereWithoutServiceInput = {
    where: OrderScalarWhereInput
    data: XOR<OrderUpdateManyMutationInput, OrderUncheckedUpdateManyWithoutServiceInput>
  }

  export type ClientCreateWithoutOrdersInput = {
    id?: string
    createdAt?: Date | string
    user: UserCreateNestedOneWithoutClientInput
  }

  export type ClientUncheckedCreateWithoutOrdersInput = {
    id?: string
    userId: string
    createdAt?: Date | string
  }

  export type ClientCreateOrConnectWithoutOrdersInput = {
    where: ClientWhereUniqueInput
    create: XOR<ClientCreateWithoutOrdersInput, ClientUncheckedCreateWithoutOrdersInput>
  }

  export type ProfessionalCreateWithoutOrdersInput = {
    id?: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfessionalInput
    categories?: ProfessionalCategoryCreateNestedManyWithoutProfessionalInput
    services?: ServiceCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutOrdersInput = {
    id?: string
    userId: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProfessionalCategoryUncheckedCreateNestedManyWithoutProfessionalInput
    services?: ServiceUncheckedCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutOrdersInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutOrdersInput, ProfessionalUncheckedCreateWithoutOrdersInput>
  }

  export type ServiceCreateWithoutOrdersInput = {
    id?: string
    title: string
    priceText?: string | null
    priceValue?: Decimal | DecimalJsLike | number | string | null
    duration?: string | null
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutServicesInput
    category?: CategoryCreateNestedOneWithoutServicesInput
  }

  export type ServiceUncheckedCreateWithoutOrdersInput = {
    id?: string
    professionalId: string
    categoryId?: string | null
    title: string
    priceText?: string | null
    priceValue?: Decimal | DecimalJsLike | number | string | null
    duration?: string | null
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type ServiceCreateOrConnectWithoutOrdersInput = {
    where: ServiceWhereUniqueInput
    create: XOR<ServiceCreateWithoutOrdersInput, ServiceUncheckedCreateWithoutOrdersInput>
  }

  export type CategoryCreateWithoutOrdersInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    professionals?: ProfessionalCategoryCreateNestedManyWithoutCategoryInput
    services?: ServiceCreateNestedManyWithoutCategoryInput
    portfolio?: PortfolioItemCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutOrdersInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    professionals?: ProfessionalCategoryUncheckedCreateNestedManyWithoutCategoryInput
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutOrdersInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutOrdersInput, CategoryUncheckedCreateWithoutOrdersInput>
  }

  export type AppointmentCreateWithoutOrderInput = {
    id?: string
    clientId: string
    scheduledAt: Date | string
    address?: string | null
    serviceName?: string | null
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
    professional: ProfessionalCreateNestedOneWithoutAppointmentsInput
  }

  export type AppointmentUncheckedCreateWithoutOrderInput = {
    id?: string
    professionalId: string
    clientId: string
    scheduledAt: Date | string
    address?: string | null
    serviceName?: string | null
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
  }

  export type AppointmentCreateOrConnectWithoutOrderInput = {
    where: AppointmentWhereUniqueInput
    create: XOR<AppointmentCreateWithoutOrderInput, AppointmentUncheckedCreateWithoutOrderInput>
  }

  export type AppointmentCreateManyOrderInputEnvelope = {
    data: AppointmentCreateManyOrderInput | AppointmentCreateManyOrderInput[]
    skipDuplicates?: boolean
  }

  export type ClientUpsertWithoutOrdersInput = {
    update: XOR<ClientUpdateWithoutOrdersInput, ClientUncheckedUpdateWithoutOrdersInput>
    create: XOR<ClientCreateWithoutOrdersInput, ClientUncheckedCreateWithoutOrdersInput>
    where?: ClientWhereInput
  }

  export type ClientUpdateToOneWithWhereWithoutOrdersInput = {
    where?: ClientWhereInput
    data: XOR<ClientUpdateWithoutOrdersInput, ClientUncheckedUpdateWithoutOrdersInput>
  }

  export type ClientUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutClientNestedInput
  }

  export type ClientUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalUpsertWithoutOrdersInput = {
    update: XOR<ProfessionalUpdateWithoutOrdersInput, ProfessionalUncheckedUpdateWithoutOrdersInput>
    create: XOR<ProfessionalCreateWithoutOrdersInput, ProfessionalUncheckedCreateWithoutOrdersInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutOrdersInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutOrdersInput, ProfessionalUncheckedUpdateWithoutOrdersInput>
  }

  export type ProfessionalUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfessionalNestedInput
    categories?: ProfessionalCategoryUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProfessionalCategoryUncheckedUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUncheckedUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type ServiceUpsertWithoutOrdersInput = {
    update: XOR<ServiceUpdateWithoutOrdersInput, ServiceUncheckedUpdateWithoutOrdersInput>
    create: XOR<ServiceCreateWithoutOrdersInput, ServiceUncheckedCreateWithoutOrdersInput>
    where?: ServiceWhereInput
  }

  export type ServiceUpdateToOneWithWhereWithoutOrdersInput = {
    where?: ServiceWhereInput
    data: XOR<ServiceUpdateWithoutOrdersInput, ServiceUncheckedUpdateWithoutOrdersInput>
  }

  export type ServiceUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    priceText?: NullableStringFieldUpdateOperationsInput | string | null
    priceValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutServicesNestedInput
    category?: CategoryUpdateOneWithoutServicesNestedInput
  }

  export type ServiceUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    priceText?: NullableStringFieldUpdateOperationsInput | string | null
    priceValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CategoryUpsertWithoutOrdersInput = {
    update: XOR<CategoryUpdateWithoutOrdersInput, CategoryUncheckedUpdateWithoutOrdersInput>
    create: XOR<CategoryCreateWithoutOrdersInput, CategoryUncheckedCreateWithoutOrdersInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutOrdersInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutOrdersInput, CategoryUncheckedUpdateWithoutOrdersInput>
  }

  export type CategoryUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professionals?: ProfessionalCategoryUpdateManyWithoutCategoryNestedInput
    services?: ServiceUpdateManyWithoutCategoryNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutOrdersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professionals?: ProfessionalCategoryUncheckedUpdateManyWithoutCategoryNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type AppointmentUpsertWithWhereUniqueWithoutOrderInput = {
    where: AppointmentWhereUniqueInput
    update: XOR<AppointmentUpdateWithoutOrderInput, AppointmentUncheckedUpdateWithoutOrderInput>
    create: XOR<AppointmentCreateWithoutOrderInput, AppointmentUncheckedCreateWithoutOrderInput>
  }

  export type AppointmentUpdateWithWhereUniqueWithoutOrderInput = {
    where: AppointmentWhereUniqueInput
    data: XOR<AppointmentUpdateWithoutOrderInput, AppointmentUncheckedUpdateWithoutOrderInput>
  }

  export type AppointmentUpdateManyWithWhereWithoutOrderInput = {
    where: AppointmentScalarWhereInput
    data: XOR<AppointmentUpdateManyMutationInput, AppointmentUncheckedUpdateManyWithoutOrderInput>
  }

  export type ProfessionalCreateWithoutPortfolioInput = {
    id?: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfessionalInput
    categories?: ProfessionalCategoryCreateNestedManyWithoutProfessionalInput
    services?: ServiceCreateNestedManyWithoutProfessionalInput
    orders?: OrderCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutPortfolioInput = {
    id?: string
    userId: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProfessionalCategoryUncheckedCreateNestedManyWithoutProfessionalInput
    services?: ServiceUncheckedCreateNestedManyWithoutProfessionalInput
    orders?: OrderUncheckedCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutPortfolioInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutPortfolioInput, ProfessionalUncheckedCreateWithoutPortfolioInput>
  }

  export type CategoryCreateWithoutPortfolioInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    professionals?: ProfessionalCategoryCreateNestedManyWithoutCategoryInput
    services?: ServiceCreateNestedManyWithoutCategoryInput
    orders?: OrderCreateNestedManyWithoutCategoryInput
  }

  export type CategoryUncheckedCreateWithoutPortfolioInput = {
    id?: string
    name: string
    slug: string
    description?: string | null
    createdAt?: Date | string
    professionals?: ProfessionalCategoryUncheckedCreateNestedManyWithoutCategoryInput
    services?: ServiceUncheckedCreateNestedManyWithoutCategoryInput
    orders?: OrderUncheckedCreateNestedManyWithoutCategoryInput
  }

  export type CategoryCreateOrConnectWithoutPortfolioInput = {
    where: CategoryWhereUniqueInput
    create: XOR<CategoryCreateWithoutPortfolioInput, CategoryUncheckedCreateWithoutPortfolioInput>
  }

  export type ProfessionalUpsertWithoutPortfolioInput = {
    update: XOR<ProfessionalUpdateWithoutPortfolioInput, ProfessionalUncheckedUpdateWithoutPortfolioInput>
    create: XOR<ProfessionalCreateWithoutPortfolioInput, ProfessionalUncheckedCreateWithoutPortfolioInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutPortfolioInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutPortfolioInput, ProfessionalUncheckedUpdateWithoutPortfolioInput>
  }

  export type ProfessionalUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfessionalNestedInput
    categories?: ProfessionalCategoryUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProfessionalCategoryUncheckedUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUncheckedUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUncheckedUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type CategoryUpsertWithoutPortfolioInput = {
    update: XOR<CategoryUpdateWithoutPortfolioInput, CategoryUncheckedUpdateWithoutPortfolioInput>
    create: XOR<CategoryCreateWithoutPortfolioInput, CategoryUncheckedCreateWithoutPortfolioInput>
    where?: CategoryWhereInput
  }

  export type CategoryUpdateToOneWithWhereWithoutPortfolioInput = {
    where?: CategoryWhereInput
    data: XOR<CategoryUpdateWithoutPortfolioInput, CategoryUncheckedUpdateWithoutPortfolioInput>
  }

  export type CategoryUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professionals?: ProfessionalCategoryUpdateManyWithoutCategoryNestedInput
    services?: ServiceUpdateManyWithoutCategoryNestedInput
    orders?: OrderUpdateManyWithoutCategoryNestedInput
  }

  export type CategoryUncheckedUpdateWithoutPortfolioInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    slug?: StringFieldUpdateOperationsInput | string
    description?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professionals?: ProfessionalCategoryUncheckedUpdateManyWithoutCategoryNestedInput
    services?: ServiceUncheckedUpdateManyWithoutCategoryNestedInput
    orders?: OrderUncheckedUpdateManyWithoutCategoryNestedInput
  }

  export type ProfessionalCreateWithoutTestimonialsInput = {
    id?: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfessionalInput
    categories?: ProfessionalCategoryCreateNestedManyWithoutProfessionalInput
    services?: ServiceCreateNestedManyWithoutProfessionalInput
    orders?: OrderCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutTestimonialsInput = {
    id?: string
    userId: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProfessionalCategoryUncheckedCreateNestedManyWithoutProfessionalInput
    services?: ServiceUncheckedCreateNestedManyWithoutProfessionalInput
    orders?: OrderUncheckedCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutTestimonialsInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutTestimonialsInput, ProfessionalUncheckedCreateWithoutTestimonialsInput>
  }

  export type UserCreateWithoutTestimonialsInput = {
    id?: string
    name: string
    email: string
    password: string
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client?: ClientCreateNestedOneWithoutUserInput
    professional?: ProfessionalCreateNestedOneWithoutUserInput
  }

  export type UserUncheckedCreateWithoutTestimonialsInput = {
    id?: string
    name: string
    email: string
    password: string
    phone?: string | null
    avatarUrl?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client?: ClientUncheckedCreateNestedOneWithoutUserInput
    professional?: ProfessionalUncheckedCreateNestedOneWithoutUserInput
  }

  export type UserCreateOrConnectWithoutTestimonialsInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutTestimonialsInput, UserUncheckedCreateWithoutTestimonialsInput>
  }

  export type ProfessionalUpsertWithoutTestimonialsInput = {
    update: XOR<ProfessionalUpdateWithoutTestimonialsInput, ProfessionalUncheckedUpdateWithoutTestimonialsInput>
    create: XOR<ProfessionalCreateWithoutTestimonialsInput, ProfessionalUncheckedCreateWithoutTestimonialsInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutTestimonialsInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutTestimonialsInput, ProfessionalUncheckedUpdateWithoutTestimonialsInput>
  }

  export type ProfessionalUpdateWithoutTestimonialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfessionalNestedInput
    categories?: ProfessionalCategoryUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutTestimonialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProfessionalCategoryUncheckedUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUncheckedUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUncheckedUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type UserUpsertWithoutTestimonialsInput = {
    update: XOR<UserUpdateWithoutTestimonialsInput, UserUncheckedUpdateWithoutTestimonialsInput>
    create: XOR<UserCreateWithoutTestimonialsInput, UserUncheckedCreateWithoutTestimonialsInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutTestimonialsInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutTestimonialsInput, UserUncheckedUpdateWithoutTestimonialsInput>
  }

  export type UserUpdateWithoutTestimonialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneWithoutUserNestedInput
    professional?: ProfessionalUpdateOneWithoutUserNestedInput
  }

  export type UserUncheckedUpdateWithoutTestimonialsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    avatarUrl?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUncheckedUpdateOneWithoutUserNestedInput
    professional?: ProfessionalUncheckedUpdateOneWithoutUserNestedInput
  }

  export type OrderCreateWithoutAppointmentsInput = {
    id?: string
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
    client: ClientCreateNestedOneWithoutOrdersInput
    professional: ProfessionalCreateNestedOneWithoutOrdersInput
    service?: ServiceCreateNestedOneWithoutOrdersInput
    category?: CategoryCreateNestedOneWithoutOrdersInput
  }

  export type OrderUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    clientId: string
    professionalId: string
    serviceId?: string | null
    categoryId?: string | null
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateOrConnectWithoutAppointmentsInput = {
    where: OrderWhereUniqueInput
    create: XOR<OrderCreateWithoutAppointmentsInput, OrderUncheckedCreateWithoutAppointmentsInput>
  }

  export type ProfessionalCreateWithoutAppointmentsInput = {
    id?: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfessionalInput
    categories?: ProfessionalCategoryCreateNestedManyWithoutProfessionalInput
    services?: ServiceCreateNestedManyWithoutProfessionalInput
    orders?: OrderCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutAppointmentsInput = {
    id?: string
    userId: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProfessionalCategoryUncheckedCreateNestedManyWithoutProfessionalInput
    services?: ServiceUncheckedCreateNestedManyWithoutProfessionalInput
    orders?: OrderUncheckedCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutProfessionalInput
    certifications?: CertificationUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutAppointmentsInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutAppointmentsInput, ProfessionalUncheckedCreateWithoutAppointmentsInput>
  }

  export type OrderUpsertWithoutAppointmentsInput = {
    update: XOR<OrderUpdateWithoutAppointmentsInput, OrderUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<OrderCreateWithoutAppointmentsInput, OrderUncheckedCreateWithoutAppointmentsInput>
    where?: OrderWhereInput
  }

  export type OrderUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: OrderWhereInput
    data: XOR<OrderUpdateWithoutAppointmentsInput, OrderUncheckedUpdateWithoutAppointmentsInput>
  }

  export type OrderUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    professional?: ProfessionalUpdateOneRequiredWithoutOrdersNestedInput
    service?: ServiceUpdateOneWithoutOrdersNestedInput
    category?: CategoryUpdateOneWithoutOrdersNestedInput
  }

  export type OrderUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalUpsertWithoutAppointmentsInput = {
    update: XOR<ProfessionalUpdateWithoutAppointmentsInput, ProfessionalUncheckedUpdateWithoutAppointmentsInput>
    create: XOR<ProfessionalCreateWithoutAppointmentsInput, ProfessionalUncheckedCreateWithoutAppointmentsInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutAppointmentsInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutAppointmentsInput, ProfessionalUncheckedUpdateWithoutAppointmentsInput>
  }

  export type ProfessionalUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfessionalNestedInput
    categories?: ProfessionalCategoryUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutAppointmentsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProfessionalCategoryUncheckedUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUncheckedUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUncheckedUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutProfessionalNestedInput
    certifications?: CertificationUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalCreateWithoutCertificationsInput = {
    id?: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    user: UserCreateNestedOneWithoutProfessionalInput
    categories?: ProfessionalCategoryCreateNestedManyWithoutProfessionalInput
    services?: ServiceCreateNestedManyWithoutProfessionalInput
    orders?: OrderCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalUncheckedCreateWithoutCertificationsInput = {
    id?: string
    userId: string
    specialty?: string | null
    bio?: string | null
    phone?: string | null
    location?: string | null
    addressStreet?: string | null
    addressNumber?: string | null
    addressComplement?: string | null
    addressNeighborhood?: string | null
    addressCity?: string | null
    addressState?: string | null
    addressCep?: string | null
    cpf?: string | null
    isVerified?: boolean
    isAvailable?: boolean
    rating?: Decimal | DecimalJsLike | number | string
    reviewCount?: number
    createdAt?: Date | string
    updatedAt?: Date | string
    categories?: ProfessionalCategoryUncheckedCreateNestedManyWithoutProfessionalInput
    services?: ServiceUncheckedCreateNestedManyWithoutProfessionalInput
    orders?: OrderUncheckedCreateNestedManyWithoutProfessionalInput
    portfolio?: PortfolioItemUncheckedCreateNestedManyWithoutProfessionalInput
    testimonials?: TestimonialUncheckedCreateNestedManyWithoutProfessionalInput
    appointments?: AppointmentUncheckedCreateNestedManyWithoutProfessionalInput
  }

  export type ProfessionalCreateOrConnectWithoutCertificationsInput = {
    where: ProfessionalWhereUniqueInput
    create: XOR<ProfessionalCreateWithoutCertificationsInput, ProfessionalUncheckedCreateWithoutCertificationsInput>
  }

  export type ProfessionalUpsertWithoutCertificationsInput = {
    update: XOR<ProfessionalUpdateWithoutCertificationsInput, ProfessionalUncheckedUpdateWithoutCertificationsInput>
    create: XOR<ProfessionalCreateWithoutCertificationsInput, ProfessionalUncheckedCreateWithoutCertificationsInput>
    where?: ProfessionalWhereInput
  }

  export type ProfessionalUpdateToOneWithWhereWithoutCertificationsInput = {
    where?: ProfessionalWhereInput
    data: XOR<ProfessionalUpdateWithoutCertificationsInput, ProfessionalUncheckedUpdateWithoutCertificationsInput>
  }

  export type ProfessionalUpdateWithoutCertificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    user?: UserUpdateOneRequiredWithoutProfessionalNestedInput
    categories?: ProfessionalCategoryUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUpdateManyWithoutProfessionalNestedInput
  }

  export type ProfessionalUncheckedUpdateWithoutCertificationsInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    specialty?: NullableStringFieldUpdateOperationsInput | string | null
    bio?: NullableStringFieldUpdateOperationsInput | string | null
    phone?: NullableStringFieldUpdateOperationsInput | string | null
    location?: NullableStringFieldUpdateOperationsInput | string | null
    addressStreet?: NullableStringFieldUpdateOperationsInput | string | null
    addressNumber?: NullableStringFieldUpdateOperationsInput | string | null
    addressComplement?: NullableStringFieldUpdateOperationsInput | string | null
    addressNeighborhood?: NullableStringFieldUpdateOperationsInput | string | null
    addressCity?: NullableStringFieldUpdateOperationsInput | string | null
    addressState?: NullableStringFieldUpdateOperationsInput | string | null
    addressCep?: NullableStringFieldUpdateOperationsInput | string | null
    cpf?: NullableStringFieldUpdateOperationsInput | string | null
    isVerified?: BoolFieldUpdateOperationsInput | boolean
    isAvailable?: BoolFieldUpdateOperationsInput | boolean
    rating?: DecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string
    reviewCount?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    categories?: ProfessionalCategoryUncheckedUpdateManyWithoutProfessionalNestedInput
    services?: ServiceUncheckedUpdateManyWithoutProfessionalNestedInput
    orders?: OrderUncheckedUpdateManyWithoutProfessionalNestedInput
    portfolio?: PortfolioItemUncheckedUpdateManyWithoutProfessionalNestedInput
    testimonials?: TestimonialUncheckedUpdateManyWithoutProfessionalNestedInput
    appointments?: AppointmentUncheckedUpdateManyWithoutProfessionalNestedInput
  }

  export type TestimonialCreateManyAuthorInput = {
    id?: string
    professionalId: string
    authorName?: string | null
    authorRole?: string | null
    content: string
    rating: number
    createdAt?: Date | string
  }

  export type TestimonialUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutTestimonialsNestedInput
  }

  export type TestimonialUncheckedUpdateWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUncheckedUpdateManyWithoutAuthorInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyClientInput = {
    id?: string
    professionalId: string
    serviceId?: string | null
    categoryId?: string | null
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutOrdersNestedInput
    service?: ServiceUpdateOneWithoutOrdersNestedInput
    category?: CategoryUpdateOneWithoutOrdersNestedInput
    appointments?: AppointmentUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutClientInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ProfessionalCategoryCreateManyProfessionalInput = {
    categoryId: string
  }

  export type ServiceCreateManyProfessionalInput = {
    id?: string
    categoryId?: string | null
    title: string
    priceText?: string | null
    priceValue?: Decimal | DecimalJsLike | number | string | null
    duration?: string | null
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyProfessionalInput = {
    id?: string
    clientId: string
    serviceId?: string | null
    categoryId?: string | null
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioItemCreateManyProfessionalInput = {
    id?: string
    categoryId?: string | null
    title: string
    imageUrl?: string | null
    year?: number | null
    createdAt?: Date | string
  }

  export type TestimonialCreateManyProfessionalInput = {
    id?: string
    authorId?: string | null
    authorName?: string | null
    authorRole?: string | null
    content: string
    rating: number
    createdAt?: Date | string
  }

  export type AppointmentCreateManyProfessionalInput = {
    id?: string
    orderId?: string | null
    clientId: string
    scheduledAt: Date | string
    address?: string | null
    serviceName?: string | null
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
  }

  export type CertificationCreateManyProfessionalInput = {
    id?: string
    name: string
    issuedAt?: Date | string | null
    expiresAt?: Date | string | null
    issuer?: string | null
  }

  export type ProfessionalCategoryUpdateWithoutProfessionalInput = {
    category?: CategoryUpdateOneRequiredWithoutProfessionalsNestedInput
  }

  export type ProfessionalCategoryUncheckedUpdateWithoutProfessionalInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type ProfessionalCategoryUncheckedUpdateManyWithoutProfessionalInput = {
    categoryId?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    priceText?: NullableStringFieldUpdateOperationsInput | string | null
    priceValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutServicesNestedInput
    orders?: OrderUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    priceText?: NullableStringFieldUpdateOperationsInput | string | null
    priceValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    priceText?: NullableStringFieldUpdateOperationsInput | string | null
    priceValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    service?: ServiceUpdateOneWithoutOrdersNestedInput
    category?: CategoryUpdateOneWithoutOrdersNestedInput
    appointments?: AppointmentUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    category?: CategoryUpdateOneWithoutPortfolioNestedInput
  }

  export type PortfolioItemUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    author?: UserUpdateOneWithoutTestimonialsNestedInput
  }

  export type TestimonialUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type TestimonialUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    authorId?: NullableStringFieldUpdateOperationsInput | string | null
    authorName?: NullableStringFieldUpdateOperationsInput | string | null
    authorRole?: NullableStringFieldUpdateOperationsInput | string | null
    content?: StringFieldUpdateOperationsInput | string
    rating?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    order?: OrderUpdateOneWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    orderId?: NullableStringFieldUpdateOperationsInput | string | null
    clientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CertificationUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CertificationUncheckedUpdateWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type CertificationUncheckedUpdateManyWithoutProfessionalInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    issuedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    issuer?: NullableStringFieldUpdateOperationsInput | string | null
  }

  export type ProfessionalCategoryCreateManyCategoryInput = {
    professionalId: string
  }

  export type ServiceCreateManyCategoryInput = {
    id?: string
    professionalId: string
    title: string
    priceText?: string | null
    priceValue?: Decimal | DecimalJsLike | number | string | null
    duration?: string | null
    status?: $Enums.ServiceStatus
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderCreateManyCategoryInput = {
    id?: string
    clientId: string
    professionalId: string
    serviceId?: string | null
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type PortfolioItemCreateManyCategoryInput = {
    id?: string
    professionalId: string
    title: string
    imageUrl?: string | null
    year?: number | null
    createdAt?: Date | string
  }

  export type ProfessionalCategoryUpdateWithoutCategoryInput = {
    professional?: ProfessionalUpdateOneRequiredWithoutCategoriesNestedInput
  }

  export type ProfessionalCategoryUncheckedUpdateWithoutCategoryInput = {
    professionalId?: StringFieldUpdateOperationsInput | string
  }

  export type ProfessionalCategoryUncheckedUpdateManyWithoutCategoryInput = {
    professionalId?: StringFieldUpdateOperationsInput | string
  }

  export type ServiceUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    priceText?: NullableStringFieldUpdateOperationsInput | string | null
    priceValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutServicesNestedInput
    orders?: OrderUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    priceText?: NullableStringFieldUpdateOperationsInput | string | null
    priceValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    orders?: OrderUncheckedUpdateManyWithoutServiceNestedInput
  }

  export type ServiceUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    priceText?: NullableStringFieldUpdateOperationsInput | string | null
    priceValue?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    duration?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumServiceStatusFieldUpdateOperationsInput | $Enums.ServiceStatus
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    professional?: ProfessionalUpdateOneRequiredWithoutOrdersNestedInput
    service?: ServiceUpdateOneWithoutOrdersNestedInput
    appointments?: AppointmentUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    serviceId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutPortfolioNestedInput
  }

  export type PortfolioItemUncheckedUpdateWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type PortfolioItemUncheckedUpdateManyWithoutCategoryInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    title?: StringFieldUpdateOperationsInput | string
    imageUrl?: NullableStringFieldUpdateOperationsInput | string | null
    year?: NullableIntFieldUpdateOperationsInput | number | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type OrderCreateManyServiceInput = {
    id?: string
    clientId: string
    professionalId: string
    categoryId?: string | null
    status?: $Enums.OrderStatus
    serviceType?: string | null
    description?: string | null
    locationCep?: string | null
    address?: string | null
    urgency?: string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: Decimal | DecimalJsLike | number | string | null
    scheduledAt?: Date | string | null
    notes?: string | null
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type OrderUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    client?: ClientUpdateOneRequiredWithoutOrdersNestedInput
    professional?: ProfessionalUpdateOneRequiredWithoutOrdersNestedInput
    category?: CategoryUpdateOneWithoutOrdersNestedInput
    appointments?: AppointmentUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    appointments?: AppointmentUncheckedUpdateManyWithoutOrderNestedInput
  }

  export type OrderUncheckedUpdateManyWithoutServiceInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    categoryId?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumOrderStatusFieldUpdateOperationsInput | $Enums.OrderStatus
    serviceType?: NullableStringFieldUpdateOperationsInput | string | null
    description?: NullableStringFieldUpdateOperationsInput | string | null
    locationCep?: NullableStringFieldUpdateOperationsInput | string | null
    address?: NullableStringFieldUpdateOperationsInput | string | null
    urgency?: NullableStringFieldUpdateOperationsInput | string | null
    attachments?: NullableJsonNullValueInput | InputJsonValue
    agreedPrice?: NullableDecimalFieldUpdateOperationsInput | Decimal | DecimalJsLike | number | string | null
    scheduledAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentCreateManyOrderInput = {
    id?: string
    professionalId: string
    clientId: string
    scheduledAt: Date | string
    address?: string | null
    serviceName?: string | null
    status?: $Enums.AppointmentStatus
    notes?: string | null
    createdAt?: Date | string
  }

  export type AppointmentUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    professional?: ProfessionalUpdateOneRequiredWithoutAppointmentsNestedInput
  }

  export type AppointmentUncheckedUpdateWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type AppointmentUncheckedUpdateManyWithoutOrderInput = {
    id?: StringFieldUpdateOperationsInput | string
    professionalId?: StringFieldUpdateOperationsInput | string
    clientId?: StringFieldUpdateOperationsInput | string
    scheduledAt?: DateTimeFieldUpdateOperationsInput | Date | string
    address?: NullableStringFieldUpdateOperationsInput | string | null
    serviceName?: NullableStringFieldUpdateOperationsInput | string | null
    status?: EnumAppointmentStatusFieldUpdateOperationsInput | $Enums.AppointmentStatus
    notes?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}