<template>

    <div data-layer="ProductCard"
        class="Productcard w-52 max-h-96 h-auto relative bg-neutral-100 rounded-lg  outline-1 outline-offset-[-1px] outline-stone-300 inline-flex flex-col justify-end items-start">
        <div data-layer="BodyContent"
            class="Bodycontent w-52 h-60 p-3.5 rounded-tl-lg rounded-tr-lg flex flex-col justify-center items-center gap-2.5">
            <NuxtImg :src="dynamicImagePath" data-layer="image 5" class="Image5 w-40 h-44" />
            <button type="button" @click="handleChangeColor" data-layer="heart-icon"
                class="HeartIcon w-5 h-5 left-[170px] top-[15px] absolute">
                <div data-layer="heart-icon" class="HeartIcon" :class="[color ? 'text-red-500' : 'text-stone-300']">
                    <svg width="22" height="19" viewBox="0 0 22 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.75 2.96636L10.2096 3.48646C10.351 3.63336 10.5461 3.71636 10.75 3.71636C10.9539 3.71636 11.149 3.63336 11.2904 3.48646L10.75 2.96636ZM8.17605 15.7876C6.66039 14.5928 5.00307 13.426 3.68829 11.9455C2.39922 10.4939 1.5 8.80023 1.5 6.60283H0C0 9.26833 1.1105 11.3018 2.56672 12.9415C3.99723 14.5523 5.82077 15.8409 7.24742 16.9656L8.17605 15.7876ZM1.5 6.60283C1.5 4.45196 2.71537 2.64825 4.37436 1.88992C5.98607 1.15321 8.15166 1.34831 10.2096 3.48646L11.2904 2.44626C8.8485 -0.0907485 6.01409 -0.508879 3.75076 0.525691C1.53471 1.53865 0 3.89076 0 6.60283H1.5ZM7.24742 16.9656C7.75965 17.3694 8.30954 17.8 8.8668 18.1256C9.4239 18.4511 10.0596 18.7157 10.75 18.7157V17.2157C10.4404 17.2157 10.0761 17.095 9.6236 16.8305C9.1713 16.5662 8.70208 16.2023 8.17605 15.7876L7.24742 16.9656ZM14.2526 16.9656C15.6792 15.8409 17.5028 14.5523 18.9333 12.9415C20.3895 11.3018 21.5 9.26833 21.5 6.60283H20C20 8.80023 19.1008 10.4939 17.8117 11.9455C16.4969 13.426 14.8396 14.5928 13.324 15.7876L14.2526 16.9656ZM21.5 6.60283C21.5 3.89076 19.9653 1.53865 17.7492 0.525691C15.4859 -0.508879 12.6515 -0.0907485 10.2096 2.44626L11.2904 3.48646C13.3483 1.34831 15.5139 1.15321 17.1256 1.88992C18.7846 2.64825 20 4.45196 20 6.60283H21.5ZM13.324 15.7876C12.7979 16.2023 12.3287 16.5662 11.8764 16.8305C11.4239 17.095 11.0596 17.2157 10.75 17.2157V18.7157C11.4404 18.7157 12.0761 18.4511 12.6332 18.1256C13.1905 17.8 13.7403 17.3694 14.2526 16.9656L13.324 15.7876Z"
                            fill="currentColor" />
                    </svg>
                </div>
            </button>
        </div>
        <div data-layer="FooterContent"
            class="Footercontent self-stretch h-28 p-3.5 bg-white rounded-bl-lg rounded-br-lg border-l border-r border-b border-stone-300 flex flex-col justify-between items-start">
            <div data-layer="ContentContainer"
                class="Contentcontainer self-stretch flex-1 flex flex-col justify-between items-start">
                <div data-layer="Nike Air Max 90 Futura"
                    class="NikeAirMax90Futura justify-start text-zinc-900 text-base font-semibold font-montserrat">
                    {{ product.name }}</div>
                <div data-layer="RatingContainer"
                    class="Ratingcontainer inline-flex justify-center items-center gap-[3px]">
                    <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M5.52447 0.463525C5.67415 0.00286925 6.32585 0.00286996 6.47553 0.463525L7.45934 3.49139C7.52628 3.6974 7.71826 3.83688 7.93487 3.83688H11.1186C11.6029 3.83688 11.8043 4.45669 11.4124 4.74139L8.83679 6.61271C8.66155 6.74003 8.58822 6.96572 8.65516 7.17173L9.63897 10.1996C9.78864 10.6602 9.2614 11.0433 8.86955 10.7586L6.29389 8.88729C6.11865 8.75997 5.88135 8.75997 5.70611 8.88729L3.13045 10.7586C2.73859 11.0433 2.21136 10.6602 2.36103 10.1996L3.34484 7.17173C3.41178 6.96572 3.33845 6.74003 3.16321 6.61271L0.587553 4.74139C0.195696 4.45669 0.397084 3.83688 0.881446 3.83688H4.06513C4.28174 3.83688 4.47372 3.6974 4.54066 3.49139L5.52447 0.463525Z"
                            fill="#FFD600" />
                    </svg>

                    <div data-layer="4,9" class="9 justify-start text-neutral-400 text-xs font-medium font-poppins">
                        {{ product.rating }}</div>
                    <div data-layer="(123 Reviews)"
                        class="123Reviews justify-start text-neutral-400 text-xs font-medium font-poppins">
                        ({{ product.reviews }} Reviews)</div>
                </div>
                <div data-layer="PriceContainer"
                    class="Pricecontainer self-stretch inline-flex justify-between items-center">
                    <div data-layer="PriceText"
                        class="Pricetext self-stretch flex justify-center items-center gap-[5px]">
                        <div data-layer="$160,00"
                            class="16000 justify-start text-zinc-400 text-xs font-medium font-poppins line-through">
                            ${{ product.originalPrice.toFixed(2) }}</div>
                        <div data-layer="$160,00"
                            class="16000 justify-start text-zinc-900 text-base font-semibold font-poppins">
                            ${{ product.discountedPrice.toFixed(2) }}
                        </div>
                    </div>
                    <div data-layer="CtaPurchase"
                        class="Ctapurchase w-7 h-7 px-1.5 py-[5px] bg-blue-600 rounded flex justify-center items-center gap-2.5">
                        <div data-layer="BagIcon" class="Bagicon w-3.5 h-3.5 flex justify-center items-center">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M5.66296 3.65789V2.86842C5.66296 1.56038 6.70923 0.5 7.99995 0.5C9.29068 0.5 10.337 1.56038 10.337 2.86842V3.65789M14.9419 7.60526C14.5234 9.72563 13.7646 13.9207 13.0733 14.6036C12.9455 14.7298 12.8073 14.8447 12.6602 14.9469C11.8639 15.5 10.797 15.5 8.66327 15.5H7.33672C5.20301 15.5 4.13615 15.5 3.33988 14.9469C3.19271 14.8447 3.05448 14.7298 2.9267 14.6036C2.23536 13.9207 2.02613 12.8606 1.60768 10.7402C1.00692 7.69597 0.706534 6.17384 1.39802 5.09526C1.52322 4.89997 1.66936 4.71932 1.83377 4.5566C2.74175 3.65789 4.2734 3.65789 7.33672 3.65789H8.66327C11.7266 3.65789 13.2583 3.65789 14.1663 4.5566C14.3306 4.71932 14.4768 4.89997 14.602 5.09526C15.0001 5.71627 15.0694 6.48431 14.9419 7.60526ZM11.116 6.81579C11.116 7.2518 10.7672 7.60526 10.337 7.60526C9.90672 7.60526 9.55795 7.2518 9.55795 6.81579C9.55795 6.37977 9.90672 6.02631 10.337 6.02631C10.7672 6.02631 11.116 6.37977 11.116 6.81579ZM6.44196 6.81579C6.44196 7.2518 6.09319 7.60526 5.66296 7.60526C5.23273 7.60526 4.88396 7.2518 4.88396 6.81579C4.88396 6.37977 5.23273 6.02631 5.66296 6.02631C6.09319 6.02631 6.44196 6.37977 6.44196 6.81579Z"
                                    stroke="#F2F2F2" stroke-linecap="round" />
                            </svg>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, defineProps, computed } from 'vue';

const color = ref(false);
const handleChangeColor = () => {
    color.value = !color.value;
};
export type ProductData = {
    name: string;
    id: string;
    rating: number;
    reviews: number;
    originalPrice: number;
    discountedPrice: number;
}
export interface ProductCardProps {
    product: ProductData;
}

const props = defineProps<ProductCardProps>();

const dynamicImagePath = computed(() => {
    return `/${props.product.id}.png`;
});

</script>

<style scoped></style>