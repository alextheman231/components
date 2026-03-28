export interface ContextHookOptions<Strict extends boolean = true> {
  /** Error if the context is missing if this is set to true. */
  strict?: Strict;
}
