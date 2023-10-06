import React, {
  type ComponentPropsWithoutRef,
  type ElementType,
  forwardRef,
  type ReactElement,
  type ReactNode,
  type Ref,
} from 'react';

/*
  forwardRefWithAs lets us forward refs while keeping the correct component type,
  which can be specified by the `as` prop.
*/

export type ElementTagNameMap = HTMLElementTagNameMap &
  Pick<SVGElementTagNameMap, Exclude<keyof SVGElementTagNameMap, keyof HTMLElementTagNameMap>>;

export type AsProp<Comp extends ElementType, Props> = {
  as?: Comp;
  ref?: Ref<
    Comp extends keyof ElementTagNameMap
      ? ElementTagNameMap[Comp]
      : Comp extends new (...args: never) => never
        ? InstanceType<Comp>
        : undefined
  >;
} & Omit<ComponentPropsWithoutRef<Comp>, 'as' | keyof Props>;

export type CompWithAsProp<Props, DefaultElementType extends ElementType> = <
  Comp extends ElementType = DefaultElementType
>(
  props: AsProp<Comp, Props> & Props
) => ReactElement;

export const forwardRefWithAs = <DefaultElementType extends ElementType, BaseProps>(
  render: (
    props: BaseProps & { as?: ElementType },
    ref: React.Ref<never>
  ) => Exclude<ReactNode, undefined>
): CompWithAsProp<BaseProps, DefaultElementType> => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  return forwardRef(render);
};
